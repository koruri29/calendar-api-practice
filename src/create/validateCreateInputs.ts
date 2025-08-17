import { validateDate, validateTime } from "../lib/validation.ts";
import type { RawCreateValues, ValidationResult } from "../types";



export function validateCreateInputs(inputs: RawCreateValues): ValidationResult {
  if (!inputs.summary){
    return {
      ok: false,
      message: 'タイトルが指定されていません',
    }
  }

  if (!inputs.startDate) {
    return {
      ok: false,
      message: '開始日が指定されていません',
    }
  }
  if (!validateDate(inputs.startDate)) {
    return {
      ok: false,
      message: '開始日の形式が不正です',
    }
  }

  if (inputs.startTime) {
    const validated = validateTime(inputs.startTime)
    if (!validated.ok) {
      return {
        ok: false,
        message: validated.message ?? '開始時刻が不正です',
      }
    }
  }

  if (inputs.endDate && validateDate(inputs.endDate)) {
    return {
      ok: false,
      message: '終了日の形式が不正です',
    }
  }

  if (inputs.endTime) {
    const validated = validateTime(inputs.endTime)
    if (!validated.ok) {
      return {
        ok: false,
        message: validated.message ?? '終了時刻が不正です',
      }
    }
  }

  return { ok: true }
}
