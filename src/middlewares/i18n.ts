import { comp } from "./composer"
import { i18n } from "utils/i18n"

comp.use((ctx, next) => {
    ctx.locale = ctx.from?.language_code ?? "ru"
    ctx.t = i18n.getFixedT(ctx.locale)
    return next()
})
