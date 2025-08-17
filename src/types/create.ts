// input values
export interface RawCreateValues {
  summary?: string
  description?: string
  location?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
}

// values to register
export interface CreateOptions {
  summary: string
  description?: string
  location?: string
  start: CreateDateOptions
  end: CreateDateOptions
}



interface CreateDateOptionsBase {
  timeZone?: string; // dateTime の場合のみ使用
}

// 終日イベント用
interface CreateDateOptionsDate extends CreateDateOptionsBase {
  date: string;
  dateTime?: never;
}

// 時間指定イベント用
interface CreateDateOptionsDateTime extends CreateDateOptionsBase {
  dateTime: string;
  date?: never;
}

export type CreateDateOptions = CreateDateOptionsDate | CreateDateOptionsDateTime;
