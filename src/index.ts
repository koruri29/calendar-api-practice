import * as dotenv from "dotenv";
import { authorize } from "./auth/authorize.ts";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createEvent } from "./create/createEvent.ts";
import type { RawCreateValues } from "./types/create.ts";
import { validateCreateInput } from "./create/validateCreateInput.ts";
import { formatCreateEvent } from "./create/formatCreateEvent.ts";
import { applyDefault } from "./create/applyDefault.ts";


// .env呼び出し
dotenv.config()


const DEFAULT_MAX_RESULTS = 10

async function main() {
  try {
    const authClient = await authorize()


    // 参照
    // const options: ListOptions = {}

    // const rl = readline.createInterface({ input, output })
    // const advanced = await rl.question('詳細検索を行いますか？[no]: ')

    // if (
    //   advanced === 'y' ||
    //   advanced === 'Y' ||
    //   advanced === 'yes' ||
    //   advanced === 'YES'
    // ) {
    //   const today = getTodayYYYYMMDD()
    //   const startStr = await rl.question(`取得開始日[${today}]: `)
    //   const endStr = await rl.question('取得終了日[none]: ')
    //   const maxStr = await rl.question('最大件数[10]: ')
    //   const keyword = await rl.question('キーワード[none]: ')

    //   if (startStr) {
    //     const inputDate = new Date(startStr)
    //     if (!isNaN(inputDate.getTime())) {
    //       options.timeMin = inputDate
    //     }
    //   }
    //   if (endStr) {
    //     const inputDate = new Date(endStr)
    //     if (!isNaN(inputDate.getTime())) {
    //       options.timeMax = inputDate
    //     }
    //   }
    //   if (maxStr) {
    //     const max = options.maxResults = parseInt(maxStr, 10)
    //     options.maxResults = isNaN(max) ? DEFAULT_MAX_RESULTS : max
    //   }
    //   if (keyword) options.q = keyword
    // }

    // rl.close()

    // await listUpcomingEvents(authClient, options)


    // 登録
    const rl2 = readline.createInterface({ input, output })

    const rawInput: RawCreateValues = {}

    console.log('予定の登録を行います')
    rawInput.summary = await rl2.question('タイトル(必須): ')
    rawInput.description = await rl2.question('内容: ')
    rawInput.location = await rl2.question('場所: ')
    rawInput.startDate = await rl2.question(`開始日(必須、yyyy-mm-dd): `)
    rawInput.startTime = await rl2.question('開始時刻(HH:mm): ')
    rawInput.endDate = await rl2.question('終了日(yyyy-mm-dd): ')
    rawInput.endTime = await rl2.question('終了時刻(HH:mm): ')

    rl2.close()

    const inputWithDefault = applyDefault(rawInput)
    const validated = validateCreateInput(inputWithDefault)
    if (!validated.ok) {
      console.log('入力値が不正です。', validated.message || '')
      return
    }

    const formattedEvent = formatCreateEvent(inputWithDefault)
    await createEvent(authClient, formattedEvent)

  } catch (error) {
    console.error(error)
  }
}

main()
