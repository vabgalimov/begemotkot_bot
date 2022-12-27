import { comp } from "./composer"
import { command } from "filters"
import { ranks } from "consts/rank"

comp.filter(command("profile.command"), async ctx => {
    ctx.autoQuote()

    const { user } = ctx.session
    const { profile, pet } = user
    const text = ctx.t(`profile.templates.${profile.template}`, {
        name: user.name,
        status: 'TODO',
        rank: profile.rank,
        messages: profile.messages,
        messagesToRankUp: getMessagesToRankUp(profile.messages),
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

    await ctx.reply(text)
})

function getMessagesToRankUp(messages: number): number {
    return ranks.find(rank => rank.maxMessages > messages)!.maxMessages
}
