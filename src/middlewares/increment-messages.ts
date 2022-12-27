import { comp } from "./composer"

comp.use(async (ctx, next) => {
    if (ctx.message) {
        const { profile } = ctx.session.user
        profile.messages++
        await profile.save()
    }
    await next()
})
