import { comp } from "./composer"
import { command } from "filters"

comp.filter(command("balance.command"), async ctx => {
    ctx.autoQuote()

    const { coins } = ctx.profile
    const text = ctx.t("balance.text", { coins })
    await ctx.reply(text)
})
