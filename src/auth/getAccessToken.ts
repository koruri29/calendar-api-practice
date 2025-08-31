import { __dirname, SCOPES, TOKEN_PATH } from "./const.ts";
import * as fs from "fs";
import * as path from "path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export async function getAccessToken(oAuth2Client: any) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  })

  console.log("右のURLで認証を行ってください: ", authUrl);

  const rl = readline.createInterface({input, output})

  const code = await rl.question("認証後に表示されるコードを入力してください: ")
  rl.close()

  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)

  // token.json に保存
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  console.log('認証トークンを保存しました')
}
