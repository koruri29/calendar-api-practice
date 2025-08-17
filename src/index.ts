import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import readline from "node:readline/promises";
import { fileURLToPath } from "url";
import { stdin as input, stdout as output } from "node:process";


dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]
const TOKEN_PATH = path.join(__dirname, "../token.json")


function createOAuth2Client() {
  const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} = process.env
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    throw new Error("Missing Google OAuth environment variables");
  }

  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
  )
}

async function getAccessToken(oAuth2Client: any) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  })

  console.log("Authorize this app by visiting this url:", authUrl);

  const rl = readline.createInterface({input, output})

  const code = await rl.question("Enter the code from that page here: ")
  rl.close()

  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)

  // token.json に保存
  const TOKEN_PATH = path.join(__dirname, "token.json");
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  console.log('Token stored to token.json')
}

async function listUpcomingEvents(oAuth2Client: any) {
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

async function authorize() {
  const oAuth2Client = createOAuth2Client()

  // すでに token.json がある場合は読み込む
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'))
    oAuth2Client.setCredentials(token)
  } else {
    await getAccessToken(oAuth2Client);
  }
  return oAuth2Client
}

async function main() {
  try {
  const authClient = await authorize()
  await listUpcomingEvents(authClient)
  } catch (error) {
    console.error(error)
  }
}

main()
