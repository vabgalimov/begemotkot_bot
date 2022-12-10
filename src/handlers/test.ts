import { comp } from "./composer"
import { flt } from "filters"

comp.filter(flt.cmd("help"), async ctx => {
    const text = ctx.t("help.text")
    await ctx.reply(text)
})
