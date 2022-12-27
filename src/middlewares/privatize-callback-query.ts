import { comp } from "./composer"
import { Transformer } from "grammy"

comp.use((ctx, next) => {
    ctx.privatizeCallbackQuery = (userIds?) => {
        ctx.api.config.use(privatizeCallbackQuery(userIds ?? [ctx.from.id]))
    }
    return next()
})

function privatizeCallbackQuery(userIds: number[]): Transformer {
    return (prev, method, payload, signal?) => {
        if (
            !method.startsWith("send") ||
            method === "sendChatAction" ||
            !("reply_markup" in payload) ||
            !payload.reply_markup ||
            !("inline_keyboard" in payload.reply_markup)
        ) {
            return prev(method, payload, signal)
        }

        const customInlineKb = payload.reply_markup.inline_keyboard.map(row => {
            return row.map(btn => {
                if (!("callback_data" in btn))
                    return btn
                return {
                    ...btn,
                    callback_data: `${userIds.join(":")}:${btn.callback_data}`
                }
            })
        })
        const customPayload = {
            ...payload,
            reply_markup: {
                ...payload.reply_markup,
                inline_keyboard: customInlineKb
            }
        }
        return prev(method, customPayload, signal)
    }
}
