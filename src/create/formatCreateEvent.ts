import type {
  CreateOptions,
  CreateDateOptions,
  RawCreateValues
} from "../types";


export function formatCreateEvent(inputs: RawCreateValues): CreateOptions {
  const start: CreateDateOptions
    = inputs.startTime
      ? { datetime: `${inputs.startDate}${inputs.startTime}` }
      : { date: inputs.startDate! }

    const endDate = inputs.endDate ? inputs.endDate : inputs.startDate!
    const end: CreateDateOptions
      = inputs.endTime
        ? { datetime: `${endDate}${inputs.endTime}` }
        : { date: endDate }

  const options: CreateOptions = {
    summary: inputs.summary || '',
    start,
    end,
  }

  if (inputs.description) options.description = inputs.description
  if (inputs.location) options.location = inputs.location

  return options
}
