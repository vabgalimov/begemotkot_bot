import "source-map-support/register"

import { run, RunnerHandle } from "@grammyjs/runner"
import { bot } from "./bot"
import { i18n } from "utils/i18n"
import { middlewares } from "./middlewares"
import { handlers } from "./handlers"

bot.use(middlewares)
bot.use(handlers)

let runner: RunnerHandle

(async () => {
    await i18n.init()
    runner = run(bot)
    console.log("Bot started")
})()

async function exit() {
    console.log("Goodbye!")
    if (runner.isRunning())
        await runner.stop()
}

process.on("SIGINT", exit)
process.on("SIGTERM", exit)