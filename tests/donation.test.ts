import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  donationAccount,
  isDonationAccountReady,
  parseDonationAmount,
} from '../src/data/donation.ts'

test('the configured destination exactly matches the company account supplied by the owner', () => {
  assert.equal(isDonationAccountReady(donationAccount), true)
  assert.equal(donationAccount.accountNumber, '318888688')
  assert.equal(donationAccount.accountHolder, 'CONG TY TNHH CONG NGHE VUA THO')
  assert.equal(donationAccount.bankName, 'MB Bank')
  assert.equal(donationAccount.bankBin, '970422')
})

test('paused, incomplete or mismatched MB configuration cannot open the QR flow', () => {
  assert.equal(
    isDonationAccountReady({ ...donationAccount, mode: 'preview' }),
    false,
  )
  for (const field of [
    'recipient',
    'bankName',
    'bankBin',
    'accountNumber',
    'accountHolder',
  ]) {
    assert.equal(
      isDonationAccountReady({ ...donationAccount, [field]: '' }),
      false,
      field,
    )
  }
  assert.equal(
    isDonationAccountReady({ ...donationAccount, bankBin: '970436' }),
    false,
  )
  assert.equal(
    isDonationAccountReady({
      ...donationAccount,
      accountNumber: '318 888 688',
    }),
    false,
  )
})

test('amounts preserve positive whole VND and reject ambiguous or invalid input', () => {
  assert.equal(parseDonationAmount('50000'), 50_000)
  assert.equal(parseDonationAmount(' 125000 '), 125_000)
  assert.equal(parseDonationAmount('1'), 1)
  for (const input of [
    '',
    ' ',
    '0',
    '-100',
    '1.5',
    '1e5',
    '100abc',
    '50,000',
    '9999999999999',
  ])
    assert.equal(parseDonationAmount(input), null, input)
})
