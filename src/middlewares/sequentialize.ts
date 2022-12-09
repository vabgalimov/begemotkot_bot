import { comp } from "./composer"
import { sequentialize } from "@grammyjs/runner"
import { MyContext } from "types/context"

function constraints(ctx: MyContext): string[] {
    const ids: number[] = []
    if (ctx.from)
        ids.push(ctx.from.id)
    return ids.map(id => `${id}`)
}

comp.use(sequentialize(constraints))
