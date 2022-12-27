import { comp } from "./composer"
import { NEW_USERS_CHAT } from "env"

const template = (name: string, id: number, username: string | undefined) => `\
-- Новый пользователь --
${name}
ID: ${id}
${username ? "@" + username : ""}`

comp.use(async (ctx, next) => {
    if (NEW_USERS_CHAT && ctx.message && ctx.session.user.profile.messages == 0) {
        const { user } = ctx.session
        const text = template(user.name, user.id, user.username)
        await ctx.api.sendMessage(NEW_USERS_CHAT, text)
    }
    await next()
})
