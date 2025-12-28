import { randomBytes } from 'crypto'

/**
 * Generate a random UUID v4
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export const v4 = (): string => {
  const bytes = randomBytes(16)

  // Version 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  // Variant 10xxxxxx
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const hex = bytes.toString('hex')

  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32)
  ].join('-')
}
