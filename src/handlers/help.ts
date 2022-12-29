import { comp } from "./composer"
import { botWasAdded, command } from "filters"
import { helpMenu } from "utils/help-menu"

comp.filter(botWasAdded(), async ctx => {
    const text = helpMenu.ru
    await ctx.reply(text)
})

comp.command(["start", "help"], async ctx => {
    ctx.autoQuote()

    const text = helpMenu[ctx.session.user.language_code]
    await ctx.reply(text)
})


comp.filter(command("help.command"), async ctx => {
    ctx.autoQuote()

    const text = helpMenu[ctx.session.user.language_code]
    await ctx.reply(text)
})
