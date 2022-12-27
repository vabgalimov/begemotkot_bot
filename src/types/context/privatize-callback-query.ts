import { CallbackQuery } from "grammy/out/types"

export interface PrivatizeCallbackQueryFlavor {
    privatizeCallbackQuery(userId?: number[]): void
    callbackQuery?: CallbackQuery & {
        privateHandled?: true
    }
}
