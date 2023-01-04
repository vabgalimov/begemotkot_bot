import { comp } from "./composer"
import { MyContext } from "types/context"
import { Transformer } from "grammy"

comp.use((ctx, next) => {
    ctx.api.config.use(autoReplyToThread(ctx))
    return next()
})

function autoReplyToThread(ctx: MyContext): Transformer {
    return (prev, method, payload, signal?) => {
        if (
            !method.startsWith("send") ||
            method === "sendChatAction" ||
            "message_thread_id" in payload
        ) {
            return prev(method, payload, signal)
        }

        if (
            ctx.msg?.chat.type !== "supergroup" &&
            "chat_id" in payload &&
            payload.chat_id == ctx.msg!.chat.id
        ) {
            return prev(method, payload, signal)
        }

        const customPayload = {
            ...payload,
            message_thread_id: ctx.msg!.message_thread_id
        }
        return prev(method, customPayload, signal)
    }
}
