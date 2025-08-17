import { TOKEN_PATH } from "./const.ts";
import { createOAuth2Client } from "./createOAuth2Client.ts";
import { getAccessToken } from "./getAccessToken.ts";
import * as fs from "fs";


export async function authorize() {
  const oAuth2Client = createOAuth2Client()

  // すでに token.tson がある場合は読み込む
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'))
    oAuth2Client.setCredentials(token)
  } else {
    await getAccessToken(oAuth2Client);
  }
  return oAuth2Client
}
