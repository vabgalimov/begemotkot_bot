import { comp } from "./composer"
import { command, privateCallbackQuery } from "filters"
import { attempts as maxAttempts, delay, prices } from "consts/bonus"
import { initField } from "markups/bonus"

const states: {
    [id: number]: {
        attempts: number
        total: number
        items: (keyof typeof prices)[][]
        opened: [number, number][]
    } | undefined
} = {}

comp.filter(command("bonus.command"), async ctx => {
    ctx.autoQuote()
    ctx.privatizeCallbackQuery()

    const { user } = ctx.session
    const { profile } = user

    if (profile.bonusGot < delay[profile.vip]) {
        const minutes = delay[profile.vip] - profile.bonusGot
        const text = ctx.t("bonus.delay", {
            hours: minutes / 60 | 0,
            minutes: minutes % 60
        })
        await ctx.reply(text)
        return
    }
    profile.bonusGotDate = Date.now()
    await profile.save()

    const state = states[ctx.from.id] = {
        attempts: maxAttempts,
        total: 0,
        items: [],
        opened: []
    }
    const text = ctx.t("bonus.begin-text", {
        user: ctx.session.user.name,
        attempts: state.attempts
    })
    await ctx.reply(text, {
        reply_markup: { inline_keyboard: initField(state) }
    })
})

comp.filter(privateCallbackQuery(/^bonus-item-(\d+)-(\d+)$/), async ctx => {
    const state = states[ctx.from.id]
    if (!state)
        return

    const y = +ctx.match[1]
    const x = +ctx.match[2]

    if (state.opened.some(([oy, ox]) => oy == y && ox == x)) {
        const text = ctx.t("bonus.field-item-opened")
        await ctx.answerCallbackQuery(text)
        return
    }
    await ctx.answerCallbackQuery()

    state.opened.push([y, x])
    state.attempts--

    const item = state.items[y][x]
    state.total += prices[item]

    if (state.attempts == 0) {
        states[ctx.from.id] = undefined
        ctx.profile.coins += state.total
        await ctx.profile.save()
        const text = ctx.t("bonus.all-attempts-left",  {
            total: state.total,
            coins: ctx.profile.coins
        })
        await ctx.editMessageText(text)
        return
    }

    const { inline_keyboard } = ctx.callbackQuery.message!.reply_markup!
    for (const [y, x] of state.opened)
        inline_keyboard[y][x].text = state.items[y][x]
    const text = ctx.t("bonus.main-text", {
        user: ctx.session.user.name,
        attempts: state.attempts,
        total: state.total
    })
    await ctx.editMessageText(text, { reply_markup: { inline_keyboard } })
})
