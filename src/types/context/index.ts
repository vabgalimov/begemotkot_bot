import { Context } from "grammy"
import { I18nFlavor } from "./i18n"

export type MyContext =
    & Context
    & I18nFlavor
