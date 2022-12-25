import { comp } from "./composer"
import { SessionData } from "types/session"
import { Chat } from "database/entity/chat"
import { User } from "database/entity/user"
import { Chat as TelegramChat, User as TelegramUser } from "grammy/out/types"

comp.use(async (ctx, next) => {
    ctx.session = {
        get: getSession,
        update: updateSession,
        ...await updateSession(ctx.from, ctx.chat)
    }
    await next()
})

async function getSession(user_id: number, chat_id?: number): Promise<SessionData | null> {
    const chat = await Chat.findOne({
        where: { id: chat_id }
    })
    const user = await User.findOne({
        where: { id: user_id }
    })
}

async function updateSession(tgUser: TelegramUser, tgChat?: TelegramChat): Promise<SessionData> {
    const user = User.create({
        id: tgUser.id,
        name: tgUser.first_name,
        username: tgUser.username
    })
    if (!tgChat) {
        return { user }
    }
    const chat = Chat.create({
        id: tgChat.id,
        name: "title" in tgChat ? tgChat.title : tgChat.first_name,
        username: "username" in tgChat ? tgChat.username : undefined
    })
    return { user, chat }
}
