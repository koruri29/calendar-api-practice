import { compareDates, compareDateTimes, validateDate, validateTime } from "../lib/validation.ts";
import type { RawCreateValues, ValidationResult } from "../types/index.ts";



export function validateCreateInput(input: RawCreateValues): ValidationResult<RawCreateValues> {
  if (!input.summary){
    return {
      ok: false,
      validated: input,
      message: 'タイトルが指定されていません',
    }
  }

  if (!input.startDate) {
    return {
      ok: false,
      validated: input,
      message: '開始日が指定されていません',
    }
  }

  const dateValidated = validateDate(input.startDate)
  if (!dateValidated.ok) {
    return {
      ok: false,
      validated: input,
      message: '開始日の形式が不正です',
    }
  }

  if (input.startTime) {
    const validated = validateTime(input.startTime)
    if (!validated.ok) {
      return {
        ok: false,
        validated: input,
        message: validated.message ?? '開始時刻の形式が不正です',
      }
    }
  }

  if (!input.endDate) {
    return {
      ok: false,
      validated: input,
      message: '終了日が指定されていません',
    }
  }

  if (input.endDate) {
    const  validated = validateDate(input.endDate)
    if (!validated.ok) {
      return {
        message: '終了日の形式が不正です',
        ok: false,
        validated: input,
      }
    }
  }

  if (input.endTime) {
    const validated = validateTime(input.endTime)
    if (!validated.ok) {
      return {
        ok: false,
        validated: input,
        message: validated.message ?? '終了時刻の形式が不正です',
      }
    }
  }

  if (!input.startTime && input.endTime) {
    return {
      ok: false,
      validated: input,
      message: '終了時刻を入力する場合、開始時刻は必須です'
    }
  }

  if (input.startTime) {
    const dateTimeResult
      = compareDateTimes(
        `${input.startDate}T${input.startTime}`,
        `${input.endDate}T${input.endTime}`,
      )
    if (!dateTimeResult.ok) {
      return {
        ok: false,
        validated: input,
        message: '日時の入力が不正です'
      }
    }
    if (dateTimeResult.relation === 'After') {
      return {
        ok: false,
        validated: input,
        message: '開始日時＞終了日時になっています'
      }
    }
  } else {
    const dateTimeResult
      = compareDates(input.startDate, input.endDate)

    if (!dateTimeResult.ok) {
      return {
        ok: false,
        validated: input,
        message: '日時の入力が不正です'
      }
    }
    if (dateTimeResult.relation !== 'Before') {
      return {
        ok: false,
        validated: input,
        message: '開始日時≧終了日時になっています'
      }
    }
  }


  return {
    ok: true,
    validated: input,
  }
}
