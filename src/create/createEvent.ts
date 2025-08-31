import { calendar_v3, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import type { CreateOptions } from "../types/index.ts";




export async function createEvent(auth: OAuth2Client, event: CreateOptions) {
  const calendar = google.calendar({ version: 'v3', auth })

  if ((event.start.date && event.end.dateTime) || (event.start.dateTime && event.end.date)) {
    throw new Error("開始日と終了日が同じ型である必要があります");
  }

  const params: calendar_v3.Params$Resource$Events$Insert
    = {
      calendarId: 'primary',
      requestBody: {
        summary: event.summary,
        start: event.start,
        end: event.end,
      }
    }
  if (event.description) params.requestBody!.description = event.description
  if (event.location) params.requestBody!.location = event.location

  const res = await calendar.events.insert(params)

  console.log('予定を登録しました: ', res.data.htmlLink)
}
