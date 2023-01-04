import { comp } from "./composer"
import { command, reply } from "filters"

comp.filter(reply()).filter(command("transfer.command"), async ctx => {
    ctx.autoQuote()

    const text = ctx.t("transfer.no-amount")
    await ctx.reply(text)
})

comp.filter(reply()).filter(command("transfer.command", /(\d+)/), async ctx => {
    ctx.autoQuote()

    const toId = ctx.msg.reply_to_message.from?.id
    if (!toId || ctx.from.id == toId)
        return

    const amount = +ctx.match[1]
    if (ctx.profile.coins < amount) {
        const text = ctx.t("transfer.no-coins", { coins: ctx.profile.coins })
        await ctx.reply(text)
        return
    }

    const toProfile = ctx.session.reply_to_session.user.profile
    toProfile.coins += amount
    ctx.profile.coins -= amount
    await Promise.all([toProfile.save(), ctx.profile.save()])

    const text = ctx.t("transfer.success", {
        from: ctx.session.user.name,
        to: ctx.session.reply_to_session.user.name,
        coins: amount
    })
    await ctx.reply(text)
})
