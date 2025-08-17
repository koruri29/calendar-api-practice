import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library"

export interface ListOptions {
  calendarId?: string
  timeMin?: Date
  timeMax?: Date
  maxResults?: number
  q?: string
}


export async function listUpcomingEvents(
  auth: OAuth2Client,
  options: ListOptions = {},
) {
  const calendar = google.calendar({version: 'v3', auth})

  const params: any = {
    calendarId: options.calendarId || "primary",
    maxResults: options.maxResults || 10,
    timeMin: options.timeMin?.toISOString() || getTodayStart().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }

  if (options.timeMax) params.timeMax = options.timeMax.toISOString()
  if (options.q) params.q = options.q

  const res = await calendar.events.list(params)

  const events = res.data.items
  if (!events || events.length === 0) {
    console.log('今日の予定はありません')
    return
  }

  console.log('今日の予定一覧')
  events.forEach(event => {
    const start = event.start?.dateTime || event.start?.date
    console.log(`${start} - ${event.summary}`)
  })
}

function getTodayStart(): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
}
