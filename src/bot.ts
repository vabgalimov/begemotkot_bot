import { Bot } from "grammy"
import { MyContext } from "types/context"
import { BOT_TOKEN } from "./env"

export const bot = new Bot<MyContext>(BOT_TOKEN)
