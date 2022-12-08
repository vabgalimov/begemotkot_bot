import { comp } from "./composer"

comp.command("test", async ctx => {
    await ctx.reply("Ping!")
})