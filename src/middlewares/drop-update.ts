import { comp } from "./composer"
import { MyContext } from "types/context"

function checkUpdate(ctx: MyContext): boolean {
    if (ctx.message?.text)
        return true
    if (ctx.editedMessage?.text)
        return true
    if (ctx.callbackQuery?.data)
        return true
    return false
}

comp.use((ctx, next) => {
    if (checkUpdate(ctx))
        return next()
})
