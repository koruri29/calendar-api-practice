import { addOneHour, getToday } from "../lib/dateTime.ts";
import type { RawCreateValues } from "../types";


export function applyDefault(input: RawCreateValues): RawCreateValues {
  if (!input.startDate) input.startDate = getToday()
  if (!input.endDate) input.endDate = input.startDate
  if (input.startTime && !input.endTime) {
    const plusOneHour = addOneHour(`${input.startDate}T${input.startTime}`)
    const [date, time] = plusOneHour.split('T');
    input.endDate = date ?? ''
    input.endTime = time ?? ''
  }

  return input
}
