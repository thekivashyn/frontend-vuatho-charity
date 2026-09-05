export type VietQrTransfer = {
  bankBin: string
  accountNumber: string
  amount: number
  reference: string
}

/** NAPAS account transfer TLV, format v1.0. No account lookup or network requests. */
function field(id: string, value: string): string {
  if (value.length > 99 || !/^[\x20-\x7E]+$/.test(value))
    throw new Error('Invalid VietQR field')
  return id + String(value.length).padStart(2, '0') + value
}

/** CRC-16/CCITT-FALSE (poly 0x1021, initial 0xFFFF). */
export function vietQrChecksum(value: string): string {
  let crc = 0xffff
  for (let i = 0; i < value.length; i++) {
    crc ^= value.charCodeAt(i) << 8
    for (let bit = 0; bit < 8; bit++)
      crc = (crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1) & 0xffff
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function buildVietQr({
  bankBin,
  accountNumber,
  amount,
  reference,
}: VietQrTransfer): string {
  if (!/^\d{6}$/.test(bankBin)) throw new Error('Invalid bank BIN')
  if (!/^\d{6,19}$/.test(accountNumber))
    throw new Error('Invalid account number')
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 999_999_999_999)
    throw new Error('Invalid VND amount')
  if (!/^[A-Z0-9 ]{1,25}$/.test(reference) || reference.trim() !== reference)
    throw new Error('Invalid transfer reference')

  const beneficiary = field('00', bankBin) + field('01', accountNumber)
  const account =
    field('00', 'A000000727') +
    field('01', beneficiary) +
    field('02', 'QRIBFTTA')
  // Reusable transfer QR: prefilled amount is not a one-time payment session.
  const payload =
    field('00', '01') +
    field('01', '11') +
    field('38', account) +
    field('53', '704') +
    field('54', String(amount)) +
    field('58', 'VN') +
    field('62', field('08', reference)) +
    '6304'
  return payload + vietQrChecksum(payload)
}
