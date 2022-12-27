import { comp } from "./composer"
import { command } from "filters"
import { helpMenu } from "utils/help-menu"

comp.filter(command("help.command"), async ctx => {
    ctx.autoQuote()

    const text = helpMenu[ctx.session.user.language_code]
    await ctx.reply(text)
})
