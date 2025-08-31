import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import readline from "node:readline";
import { authorize } from "./auth/authorize.ts";
import inquirer from "inquirer";
import { DEFAULT_MAX_RESULTS, MENUS } from "./const.ts";
import { createEventFlow } from "./create/flow.ts";
import { listEventsFlow } from "./get/flow.ts";
import { sleep } from "./lib/utils.ts";


// .env呼び出し
dotenv.config()


async function main() {
  try {
    // 認証
    const authClient = await authorize()

    // メイン処理
    let exit = false;

    while (!exit) {
      const choice = await mainMenu()
      exit = await run(authClient, choice)
    }
  } catch (error) {
    console.error(error)
  }
}

async function mainMenu(): Promise<string> {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: '操作を選択してください',
      choices: [
        { name: '予定の登録', value: MENUS.CREATE },
        { name: '予定の確認', value: MENUS.LIST },
        { name: '終了', value: MENUS.EXIT },
      ]
    }
  ])

  return answer.menu
}

async function run(authClient: OAuth2Client, choice: string, duration: number = 500): Promise<boolean> {
  let exit = false

  switch (choice) {
    case MENUS.CREATE:
      await createEventFlow(authClient)
      await pressEnterToContinue()
      break
    case MENUS.LIST:
      await listEventsFlow(authClient, DEFAULT_MAX_RESULTS)
      await pressEnterToContinue()
      break
    case MENUS.EXIT:
      exit = true
      break
  }

  return exit
}

async function pressEnterToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise<void>(resolve => {
    rl.question("\nEnterキーを押して続行...", () => {
      rl.close();
      resolve();
    });
  });
}

main()
