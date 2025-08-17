import { fileURLToPath } from "url";
import * as path from "path";


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const SCOPES = ["https://www.googleapis.com/auth/calendar"]
export const TOKEN_PATH = path.join(__dirname, "../../token.json")
