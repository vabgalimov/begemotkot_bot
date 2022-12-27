import { comp } from "./composer"
import { command } from "filters"

comp.filter(command("profile.command"), async ctx => {
    ctx.autoQuote()

    const { user } = ctx.session
    const { profile, pet } = user
    const text = ctx.t(`profile.templates.${profile.template}`, {
        name: user.name,
        status: 'TODO',
        rank: 'TODO',
        messages: profile.messages,
        messagesToRankUp: 'TODO',
        coins: profile.coins,
        rating: profile.rating,
        petName: pet.name,
        petSize: pet.size,
        petPower: pet.power,
        petBattleWins: pet.battleWins,
        petBattleTotal: pet.battleTotal,
        duelWins: profile.duelWins,
        duelTotal: profile.duelTotal,
        firstChat: user.chats[0].name
    })

    console.log(ctx.session)
    await ctx.reply(text)
})
