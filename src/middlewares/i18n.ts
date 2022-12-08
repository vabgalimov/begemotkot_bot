import { comp } from "./composer"
import { i18n } from "utils/i18n"

comp.use((ctx, next) => {
    const lang = ctx.from?.language_code ?? "ru"
    ctx.t = i18n.getFixedT(lang)
    return next()
})