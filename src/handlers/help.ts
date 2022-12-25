import { comp } from "./composer"
import { command } from "filters"
import { commandDescriptions } from "utils/commands-descs"

comp.filter(command("help.command"), async ctx => {
    ctx.autoQuote()
    const descs = commandDescriptions[ctx.locale] ?? commandDescriptions["ru"]
    const text = descs.map(desc => `${desc.commands.join(", ")} - ${desc.description}`).join("\n")
    await ctx.reply(text)
})
