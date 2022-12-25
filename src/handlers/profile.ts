import { comp } from "./composer"
import { command } from "filters"

comp.filter(command("profile.command"), ctx => {
    ctx.autoQuote()

    console.log(ctx.session)
})
