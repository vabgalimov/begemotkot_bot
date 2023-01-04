import { comp } from "./composer"
import { command } from "filters"

comp.filter(command("pet-nickname.command", /(.+)/), async ctx => {
    ctx.autoQuote()

    const name = ctx.match[1]
    ctx.pet.name = name
    await ctx.pet.save()

    const text = ctx.t("pet-nickname.text")
    await ctx.reply(text)
})
