import { comp } from "./composer"
import { sequentialize } from "@grammyjs/runner"
import { MyContext } from "types/context"

function constraints(ctx: MyContext): string[] {
    const ids = [ctx.chat.id, ctx.from.id]
    return ids.map(id => `${id}`)
}

comp.use(sequentialize(constraints))
