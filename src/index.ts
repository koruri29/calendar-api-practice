import * as dotenv from "dotenv";
import { authorize } from "./auth/authorize.ts";
import { listUpcomingEvents, type ListOptions } from "./get/listUpcomingEvents.ts";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


// .env呼び出し
dotenv.config()


const DEFAULT_MAX_RESULTS = 10

async function main() {
  try {
    const authClient = await authorize()


    const options: ListOptions = {}

    const rl = readline.createInterface({ input, output })
    const advanced = await rl.question('詳細検索を行いますか？(no): ')

    if (
      advanced === 'y' ||
      advanced === 'Y' ||
      advanced === 'yes' ||
      advanced === 'YES'
    ) {
      const today = getTodayYYYYMMDD()
      const startStr = await rl.question(`取得開始日(${today}): `)
      const endStr = await rl.question('取得終了日(none): ')
      const maxStr = await rl.question('最大件数(10): ')
      const keyword = await rl.question('キーワード(none): ')

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
        options.maxResults = isNaN(max) ? DEFAULT_MAX_RESULTS : max
      }
      if (keyword) options.q = keyword
    }

    rl.close()

    await listUpcomingEvents(authClient, options)

  } catch (error) {
    console.error(error)
  }
}

function getTodayYYYYMMDD(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

main()
