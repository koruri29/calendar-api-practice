export interface ValidationResult<T> {
  ok: boolean
  validated: T
  message?: string
}
