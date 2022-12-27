import dotenv from "dotenv"
import { cleanEnv, num, str } from "envalid"

dotenv.config({ path: ".env" })

export const env = cleanEnv(process.env, {
    BOT_TOKEN: str({ desc: "A bot token from @BotFather" }),
    DEBUG_LEVEL: num({ desc: "Debug level; set 0 to disable", default: 0 }),
    NEW_USERS_CHAT: num({ desc: "Chat id for new users info; set 0 to disable", default: 0 })
})

export const BOT_TOKEN = env.BOT_TOKEN
export const DEBUG_LEVEL = env.DEBUG_LEVEL
export const NEW_USERS_CHAT = env.NEW_USERS_CHAT
