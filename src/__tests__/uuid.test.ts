import { describe, it, expect } from 'vitest'
import { v4 } from '../utils/uuid'

describe('uuid', () => {
  describe('v4', () => {
    it('should generate a valid uuid v4 format', () => {
      const uuid = v4()
      const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      expect(uuid).toMatch(regex)
    })

    it('should generate unique uuids', () => {
      const uuid1 = v4()
      const uuid2 = v4()
      expect(uuid1).not.toBe(uuid2)
    })
  })
})
