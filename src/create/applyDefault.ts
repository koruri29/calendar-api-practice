import { addOneHour, calcDate, getToday, parseDateToSafeString } from "../lib/dateTime.ts";
import type { RawCreateValues } from "../types/index.ts";


export function applyDefault(input: RawCreateValues): RawCreateValues {
  if (input.startDate) {
    input.startDate = parseDateToSafeString(input.startDate)
  } else {
    input.startDate = getToday()
  }
  if (input.endDate) {
    input.endDate = parseDateToSafeString(input.endDate)
  } else {
    input.endDate = calcDate(input.startDate, 0, 0, 1)
  }
  if (input.startTime && !input.endTime) {
    const plusOneHour = addOneHour(`${input.endDate}T${input.startTime}`)
    const [date, time] = plusOneHour.split('T');
    input.endDate = date ?? ''
    input.endTime = time?.slice(0, 5) ?? ''
  }

  return input
}
