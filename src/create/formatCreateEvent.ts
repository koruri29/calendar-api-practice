import type {
  CreateOptions,
  CreateDateOptions,
  RawCreateValues
} from "../types/index.ts";


export function formatCreateEvent(inputs: RawCreateValues): CreateOptions {
  const start: CreateDateOptions = inputs.startTime
    ? {
        dateTime: `${inputs.startDate}T${inputs.startTime}:00`,
        timeZone: 'Asia/Tokyo',
      }
    : { date: inputs.startDate! };

  const endDate = inputs.endDate ? inputs.endDate : inputs.startDate!;
  let end: CreateDateOptions;
  if (inputs.endTime) {
    end = {
      dateTime: `${endDate}T${inputs.endTime}:00`,
      timeZone: 'Asia/Tokyo',
    };
  } else if (inputs.startTime) {
    end = {
      dateTime: addOneHourToTime(endDate, inputs.startTime),
      timeZone: 'Asia/Tokyo',
    };
  } else {
    end = { date: endDate };
  }

  const options: CreateOptions = {
    summary: inputs.summary || '',
    start,
    end,
  }

  if (inputs.description) options.description = inputs.description
  if (inputs.location) options.location = inputs.location

  return options
}

function addOneHourToTime(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  const dt = new Date(year!, month! - 1, day, hour, minute);
  dt.setHours(dt.getHours() + 1);

  // YYYY-MM-DDTHH:mm:ss の形式に
  return dt.toISOString().slice(0, 19);
}
