import { comp } from "./composer"

comp.use(async (ctx, next) => {
    await next()
    if (ctx.callbackQuery?.privateHandled) {
        const text = ctx.t("private-callback-query.different-ids")
        await ctx.answerCallbackQuery(text)
    }
})
