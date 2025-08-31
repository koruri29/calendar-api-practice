import { OAuth2Client } from "google-auth-library";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createEvent } from "./createEvent.ts";
import type { RawCreateValues } from "../types/create.ts";
import { validateCreateInput } from "./validateCreateInput.ts";
import { formatCreateEvent } from "./formatCreateEvent.ts";
import { applyDefault } from "./applyDefault.ts";

export async function createEventFlow(authClient: OAuth2Client): Promise<void> {
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
}
