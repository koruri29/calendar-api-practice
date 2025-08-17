import { SCOPES } from "./const.ts";
import * as fs from "fs";
import * as path from "path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export async function getAccessToken(oAuth2Client: any) {
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

  // token.tson に保存
  const TOKEN_PATH = path.join(__dirname, "。。・token.tson");
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  console.log('Token stored to token.tson')
}
