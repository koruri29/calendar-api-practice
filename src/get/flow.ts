import { OAuth2Client } from "google-auth-library";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { listUpcomingEvents, type ListOptions } from "./listUpcomingEvents.ts";
import { getToday } from "../lib/dateTime.ts";


export async function listEventsFlow(authClient: OAuth2Client, maxResults: number): Promise<void> {
  const options: ListOptions = {}

  const rl = readline.createInterface({ input, output })
  const advanced = await rl.question('詳細検索を行いますか？[no]: ')

  if (
    advanced === 'y' ||
    advanced === 'Y' ||
    advanced === 'yes' ||
    advanced === 'YES'
  ) {
    const today = getToday()
    const startStr = await rl.question(`取得開始日[${today}]: `)
    const endStr = await rl.question('取得終了日[none]: ')
    const maxStr = await rl.question('最大件数[10]: ')
    const keyword = await rl.question('キーワード[none]: ')

    if (startStr) {
      const inputDate = new Date(startStr)
      if (!isNaN(inputDate.getTime())) {
        options.timeMin = inputDate
      }
    }
    if (endStr) {
      const inputDate = new Date(endStr)
      if (!isNaN(inputDate.getTime())) {
        options.timeMax = inputDate
      }
    }
    if (maxStr) {
      const max = options.maxResults = parseInt(maxStr, 10)
      options.maxResults = isNaN(max) ? maxResults : max
    }
    if (keyword) options.q = keyword
  }

  rl.close()

  await listUpcomingEvents(authClient, options)
}
