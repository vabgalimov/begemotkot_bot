import { comp } from "./composer"
import { command, privateCallbackQuery } from "filters"
import { getPetActions } from "markups/pet-menu"
import { prices } from "consts/pet-menu"
import { Random } from "utils/random"

comp.filter(command("pet-menu.command"), async ctx => {
    ctx.autoQuote()
    ctx.privatizeCallbackQuery()

    const text = ctx.t("pet-menu.text", {
        ...ctx.pet,
        coins: ctx.profile.coins
    })
    await ctx.reply(text, {
        reply_markup: { inline_keyboard: getPetActions(ctx.t) }
    })
})

comp.filter(privateCallbackQuery(/pet-menu-([a-zA-Z]+)/), async ctx => {
    const action = ctx.match[1] as keyof typeof prices

    const price = prices[action]
    if (ctx.profile.coins < price) {
        const text = ctx.t("pet-menu.no-coins")
        await ctx.answerCallbackQuery(text)
        return
    }

    let added: number
    switch (action) {
    case "feed":
        added = Random.inti(1, 5)
        ctx.pet.size += added
        break
    case "train":
        added = Random.inti(1, 3)
        ctx.pet.power += added
        break
    }
    ctx.profile.coins -= price
    await Promise.all([ctx.profile.save(), ctx.pet.save()])

    let text = ctx.t(`pet-menu.outcomes.${action}`, { added })
    await ctx.answerCallbackQuery(text)

    text = ctx.t("pet-menu.text", {
        ...ctx.pet,
        coins: ctx.profile.coins
    })
    await ctx.editMessageText(text, {
        reply_markup: ctx.msg.reply_markup
    })
})
