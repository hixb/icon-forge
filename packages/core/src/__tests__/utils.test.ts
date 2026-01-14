import { describe, expect, it } from 'vitest'
import { mergeClasses, toKebabCase, toPascalCase } from '../utils'

describe('core Utils', () => {
  describe('toPascalCase', () => {
    it('converts kebab-case to PascalCase', () => {
      expect(toPascalCase('arrow-right')).toBe('ArrowRight')
      expect(toPascalCase('menu-icon')).toBe('MenuIcon')
      expect(toPascalCase('x')).toBe('X')
    })

    it('handles underscores', () => {
      expect(toPascalCase('arrow_right')).toBe('ArrowRight')
    })
  })

  describe('toKebabCase', () => {
    it('converts PascalCase to kebab-case', () => {
      expect(toKebabCase('ArrowRight')).toBe('arrow-right')
      expect(toKebabCase('MenuIcon')).toBe('menu-icon')
      expect(toKebabCase('X')).toBe('x')
    })
  })

  describe('mergeClasses', () => {
    it('merges class names', () => {
      expect(mergeClasses('icon', 'custom')).toBe('icon custom')
      expect(mergeClasses('icon', undefined, 'custom')).toBe('icon custom')
      expect(mergeClasses('icon', null, false, 'custom')).toBe('icon custom')
    })
  })
})
