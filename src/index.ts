import * as dotenv from "dotenv";
import { authorize } from "./auth/authorize.ts";
import { listUpcomingEvents } from "./get/listUpcomingEvents.ts";


// .env呼び出し
dotenv.config()


async function main() {
  try {
  const authClient = await authorize()
  await listUpcomingEvents(authClient)
  } catch (error) {
    console.error(error)
  }
}

main()
