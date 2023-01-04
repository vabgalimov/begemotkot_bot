import { MyContext } from "types/context"
import { CallbackQuery, Message } from "grammy/out/types"

type FilteredContext<C> = C & {
    callbackQuery: CallbackQuery & {
        data: string,
        message: Message
    }
    match: RegExpMatchArray
    msg: Message
}

export function privateCallbackQuery(data: string | RegExp, userId?: number) {
    return <C extends MyContext>(ctx: C): ctx is FilteredContext<C> => {
        if (!ctx.callbackQuery?.data?.includes(":"))
            return false

        userId ??= ctx.from.id
        const expectIds = ctx.callbackQuery.data.split(":").slice(0, -1).map(id => +id)
        if (expectIds.every(expectId => expectId != userId))
            return false

        const cbqData = ctx.callbackQuery.data.slice(ctx.callbackQuery.data.lastIndexOf(":")+1)
        if (typeof data === "string") {
            ctx.callbackQuery.privateHandled = true
            return cbqData == data
        }
        ctx.match = cbqData.match(data) ?? undefined
        if (ctx.match)
            ctx.callbackQuery.privateHandled = true
        return !!ctx.match
    }
}
