import "source-map-support/register"
import "./extendings"

import { AppDataSource } from "database"
import { bot } from "bot"
import { middlewares } from "middlewares"
import { handlers } from "handlers"
import { run, RunnerHandle } from "@grammyjs/runner"

bot.use(middlewares)
bot.use(handlers)

let runner: RunnerHandle

async function main() {
    await AppDataSource.initialize()
    runner = run(bot)
    console.log("Bot started")
}

async function exit() {
    console.log("Goodbye!")
    if (runner.isRunning())
        await runner.stop()
    if (AppDataSource.isInitialized)
        await AppDataSource.destroy()
}

main().then(() => {
    process.on("SIGINT", exit)
    process.on("SIGTERM", exit)
})
