import { comp } from "./composer"
import { command } from "filters"
import { prices, extraCoins } from "consts/vip"
import { DONATE_URL } from "env"

comp.filter(command("vip.command"), async ctx => {
    ctx.autoQuote()

    const text = ctx.t("vip.text", {
        prices,
        extraCoins,
        donateUrl: DONATE_URL
    })
    await ctx.reply(text)
})
