import { google } from "googleapis";


export async function listUpcomingEvents(oAuth2Client: any) {
  const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

  // 今日のイベントを取得
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  })

  const events = res.data.items
  if (!events || events.length === 0) {
    console.log('今日のイベントはありません')
    return
  }

  console.log('今日のイベント一覧')
  events.forEach(event => {
    const start = event.start?.dateTime || event.start?.date
    console.log(`${start} - ${event.summary}`)
  })
}
