import { comp } from "./composer"

comp.command("test", async ctx => {
    const text = ctx.t("help.text")
    await ctx.reply(text)
})