import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'

type SoundSettings = {
  enabled: boolean
  pending: boolean
  error: string
  toggle: () => void
}
const SoundContext = createContext<SoundSettings | null>(null)

/** Audio is created only by an explicit opt-in, never during render or hydration. */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const contextRef = useRef<AudioContext | null>(null)
  const lastSound = useRef(-Infinity)

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) void contextRef.current?.suspend().catch(() => {})
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      const context = contextRef.current
      contextRef.current = null
      void context?.close().catch(() => {})
    }
  }, [])

  function note(context: AudioContext, frequency: number) {
    if (
      contextRef.current !== context ||
      context.state !== 'running' ||
      document.hidden
    )
      return
    const now = context.currentTime
    if (now - lastSound.current < 0.08) return
    lastSound.current = now
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, now)
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.65,
      now + 0.075,
    )
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.025, now + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
    }
    oscillator.start(now)
    oscillator.stop(now + 0.1)
  }

  async function toggle() {
    if (pending) return
    setError('')
    if (enabled) {
      setEnabled(false)
      const context = contextRef.current
      contextRef.current = null
      void context?.close().catch(() => {})
      return
    }
    setPending(true)
    try {
      const context = new AudioContext()
      contextRef.current = context
      lastSound.current = -Infinity
      await context.resume()
      if (contextRef.current !== context) return
      if (context.state !== 'running') throw new Error('Audio unavailable')
      setEnabled(true)
      note(context, 660)
    } catch {
      setError(
        'Trình duyệt chưa mở được âm thanh. Bạn vẫn có thể sử dụng trang bình thường.',
      )
      const context = contextRef.current
      contextRef.current = null
      void context?.close().catch(() => {})
    } finally {
      setPending(false)
    }
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (!enabled || !(event.target instanceof Element)) return
    const control = event.target.closest('button, a[href], summary')
    if (
      !control ||
      control.closest('[data-sound-toggle]') ||
      control.matches(':disabled, [aria-disabled="true"]')
    )
      return
    const context = contextRef.current
    if (!context) return
    const frequency = control.closest('.donation-presets') ? 740 : 520
    void context
      .resume()
      .then(() => note(context, frequency))
      .catch(() => {})
  }

  return (
    <SoundContext.Provider value={{ enabled, pending, error, toggle }}>
      <div className="sound-feedback-root" onClickCapture={onClick}>
        {children}
      </div>
    </SoundContext.Provider>
  )
}

export function SoundToggle({ compact = false }: { compact?: boolean }) {
  const settings = useContext(SoundContext)
  if (!settings) return null
  const { enabled, pending, error, toggle } = settings
  return (
    <span className={`sound-control${compact ? ' sound-control-compact' : ''}`}>
      <button
        type="button"
        className="sound-toggle"
        data-sound-toggle
        aria-label="Âm thanh tương tác"
        aria-pressed={enabled}
        disabled={pending}
        title={enabled ? 'Tắt âm thanh tương tác' : 'Bật âm thanh tương tác'}
        onClick={() => {
          void toggle()
        }}
      >
        {enabled ? (
          <Volume2 size={17} aria-hidden />
        ) : (
          <VolumeX size={17} aria-hidden />
        )}
        {!compact && <span>Âm thanh {enabled ? 'bật' : 'tắt'}</span>}
      </button>
      {error && (
        <span className="sound-error" role="status">
          {error}
        </span>
      )}
    </span>
  )
}
