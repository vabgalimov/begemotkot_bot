import { comp } from "./composer"
import { command } from "filters"

comp.filter(command("vip.command"), async ctx => {
    ctx.autoQuote()

    const text = ctx.t("vip.text")
    await ctx.reply(text)
})
