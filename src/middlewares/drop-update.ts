import { comp } from "./composer"
import { MyContext } from "types/context"
import { Debug } from "utils/debugger"

function checkUpdate(ctx: MyContext): boolean {
    if (ctx.message?.text)
        return true
    if (ctx.editedMessage?.text)
        return true
    if (ctx.callbackQuery?.data)
        return true
    if (ctx.myChatMember)
        return true
    return false
}

comp.use((ctx, next) => {
    if (checkUpdate(ctx))
        return next()
    console.log(ctx)
    Debug.log(`update ${ctx.update.update_id} was dropped`)
})
