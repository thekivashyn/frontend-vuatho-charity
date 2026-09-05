import assert from 'node:assert/strict'
import { test } from 'node:test'
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import { PNG } from 'pngjs'
import { buildVietQr, vietQrChecksum } from '../src/lib/vietqr.ts'
import {
  donationAccount,
  donationReference,
  donationPresets,
} from '../src/data/donation.ts'

// Independent TLV reader: checks field boundaries, duplicates, and all nested values.
function fields(value: string) {
  const result: Record<string, string> = {}
  let index = 0
  while (index < value.length) {
    const id = value.slice(index, index + 2)
    const size = value.slice(index + 2, index + 4)
    assert.match(id + size, /^\d{4}$/)
    assert.equal(result[id], undefined, `duplicate ${id}`)
    index += 4
    assert.ok(index + Number(size) <= value.length)
    result[id] = value.slice(index, index + Number(size))
    index += Number(size)
  }
  return result
}
const transfer = {
  bankBin: donationAccount.bankBin,
  accountNumber: donationAccount.accountNumber,
  reference: donationReference,
  amount: 150_000,
}

test('CRC uses the standard CCITT-FALSE check vector', () => {
  assert.equal(vietQrChecksum('123456789'), '29B1')
})

test('NAPAS transfer fields resolve to the exact MB account, VND amount and reference', () => {
  const payload = buildVietQr(transfer)
  const root = fields(payload)
  assert.equal(root['00'], '01')
  assert.equal(root['01'], '11')
  assert.equal(root['53'], '704')
  assert.equal(root['54'], '150000')
  assert.equal(root['58'], 'VN')
  assert.equal(fields(root['62'])['08'], 'VUATHO DONG HANH')
  const merchant = fields(root['38'])
  assert.equal(merchant['00'], 'A000000727')
  assert.equal(merchant['02'], 'QRIBFTTA')
  assert.deepEqual(fields(merchant['01']), {
    '00': '970422',
    '01': '318888688',
  })
  assert.equal(root['63'], vietQrChecksum(payload.slice(0, -4)))
  assert.notEqual(buildVietQr({ ...transfer, amount: 200_000 }), payload)
})

test('invalid transfer data is rejected instead of producing a payable QR', () => {
  for (const amount of [0, -1, 1.5, NaN, Infinity, 1_000_000_000_000])
    assert.throws(() => buildVietQr({ ...transfer, amount }))
  for (const accountNumber of [
    '',
    '318 888 688',
    '318888688<script>',
    '12345678901234567890',
  ])
    assert.throws(() => buildVietQr({ ...transfer, accountNumber }))
  for (const reference of [
    '',
    'secret@example.com',
    'X'.repeat(26),
    ' TEST ',
    'TEST\nTRANSFER',
  ])
    assert.throws(() => buildVietQr({ ...transfer, reference }))
  assert.throws(() => buildVietQr({ ...transfer, bankBin: 'MB' }))
})

test('independent image decoder reads each preset and custom amount at phone and export sizes', async () => {
  for (const amount of [...donationPresets, 150_000, 999_999_999_999]) {
    const payload = buildVietQr({ ...transfer, amount })
    for (const width of [208, 288, 720]) {
      const buffer = await QRCode.toBuffer(payload, {
        width,
        margin: 4,
        errorCorrectionLevel: 'M',
        color: { dark: '#102C2C', light: '#FFFFFF' },
      })
      const png = PNG.sync.read(buffer)
      const decoded = jsQR(
        new Uint8ClampedArray(png.data),
        png.width,
        png.height,
      )
      assert.equal(decoded?.data, payload, `${amount} VND at ${width}px`)
    }
  }
})
