import { Context, Filter } from "grammy"
import { I18nFlavor } from "./i18n"

type MyBaseContext =
    & Context
    & I18nFlavor

export type MyContext = Filter<MyBaseContext,
    | "message:text"
    | "callback_query:data">
