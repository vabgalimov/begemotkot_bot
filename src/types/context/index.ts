import { Context, /* Filter */ } from "grammy"
import { I18nFlavor } from "./i18n"
import { AutoQuoteFlavor } from "./auto-quote"
import { SessionFlavor } from "./session"
import { Chat, Message, User } from "grammy/out/types"

type MyBaseContext =
    & Context
    & I18nFlavor
    & AutoQuoteFlavor
    & SessionFlavor

export type MyContext = MyBaseContext & {
    chat: Chat,
    from: User,
    msg: Message
}
