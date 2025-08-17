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

export interface CreateDateOptions {
  date?: string // yyyy-mm-dd
  datetime?: string // ISO形式の日時
}
