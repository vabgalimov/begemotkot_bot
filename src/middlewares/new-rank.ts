import { comp } from "./composer"
import { ranks } from "consts/rank"

comp.use(async (ctx, next) => {
    let newRank = ranks.findIndex(rank => rank.maxMessages == ctx.session.user.profile.messages)
    if (newRank != -1) {
        const newRankName = `${newRank + 1}`
        const text = ctx.t("rank.rankUp", {
            user: ctx.session.user.name,
            newRank: newRankName
        })
        await ctx.reply(text)
    }
    await next()
})
