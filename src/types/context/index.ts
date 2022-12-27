import { Context } from "grammy"
import { Chat, Message, User } from "grammy/out/types"
import { I18nFlavor } from "./i18n"
import { AutoQuoteFlavor } from "./auto-quote"
import { SessionFlavor } from "./session"
import { PrivatizeCallbackQueryFlavor } from "./privatize-callback-query"

export type MyContext =
    & Context
    & NotNullable
    & I18nFlavor
    & AutoQuoteFlavor
    & SessionFlavor
    & PrivatizeCallbackQueryFlavor

type NotNullable = {
    chat: Chat,
    from: User,
    msg: Message
}
