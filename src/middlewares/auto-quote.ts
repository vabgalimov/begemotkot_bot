import { comp } from "./composer"
import { addReplyParam } from "@roziscoding/grammy-autoquote"
import { MyContext } from "types/context"
import { Transformer } from "grammy"

comp.use((ctx, next) => {
    ctx.autoQuote = (replyRequired = false) => {
        ctx.api.config.use(addReplyParam(ctx))
        if (!replyRequired)
            ctx.api.config.use(ignoreMissingReply(ctx))
    }
    return next()
})

function ignoreMissingReply(ctx: MyContext): Transformer {
    return (prev, method, payload, signal?) => {
        if (
            !method.startsWith("send") ||
            method === "sendChatAction" ||
            "allow_sending_without_reply" in payload
        ) {
            return prev(method, payload, signal)
        }

        if (
            "chat_id" in payload &&
            payload.chat_id !== ctx.msg?.chat.id
        ) {
            return prev(method, payload, signal)
        }

        const customPayload = {
            ...payload,
            allow_sending_without_reply: true
        }
        return prev(method, customPayload, signal)
    }
}
