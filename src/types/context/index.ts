import { Context } from "grammy"
import { Chat, Message, User } from "grammy/out/types"
import { I18nFlavor } from "./i18n"
import { AutoQuoteFlavor } from "./auto-quote"
import { SessionFlavor } from "./session"

export type MyContext =
    & Context
    & I18nFlavor
    & AutoQuoteFlavor
    & SessionFlavor
    & NotNullable

type NotNullable = {
    chat: Chat,
    from: User,
    msg: Message
}
