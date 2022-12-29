import { comp } from "./composer"
import { Chat } from "database/entity/chat"
import { User } from "database/entity/user"
import { SessionData } from "types/session"
import { Chat as TelegramChat, User as TelegramUser } from "grammy/out/types"

comp.use(async (ctx, next) => {
    const chat = await getChat(ctx.chat.id)
    const user = await getUser(ctx.from.id)
    let reply_to_session: SessionData | null = null
    if (ctx.msg?.reply_to_message?.from) {
        const { chat: rTgChat, from: rTgUser } = ctx.msg.reply_to_message
        const rChat = await getChat(ctx.msg.reply_to_message.chat.id)
        const rUser = await getUser(ctx.msg.reply_to_message.from.id)
        reply_to_session = await saveChatUser(rChat, rUser, rTgChat, rTgUser)
    }
    ctx.session = {
        ...await saveChatUser(chat, user, ctx.chat, ctx.from),
        reply_to_session: reply_to_session ?? ctx.session,
        async get(user_id, chat_id) {
            const user = await getUser(user_id)
            if (!user)
                return null
            if (!chat_id)
                return { user }
            const chat = await getChat(user_id) ?? undefined
            return { chat, user }
        }
    }
    ctx.profile = ctx.session.user.profile
    ctx.pet = ctx.session.user.pet
    await next()
})

async function saveChatUser(chat: Chat | null, user: User | null, tgChat: TelegramChat, tgUser: TelegramUser): Promise<SessionData> {
    const upChat = new Chat(tgChat)
    if (chat) {
        chat.type = upChat.type
        chat.name = upChat.name
        chat.username = upChat.username
    } else {
        chat = upChat
    }
    chat.users ??= []
    const upUser = new User(tgUser)
    if (user) {
        user.name = upUser.name
        user.username = upUser.username
        user.language_code = upUser.language_code
    } else {
        user = upUser
    }
    user.chats ??= []

    if (chat.users.every(inUser => inUser.id != user!.id))
        chat.users.push(user)
    if (user.chats.every(inChat => inChat.id != chat!.id))
        user.chats.push(chat)

    return {
        chat: await chat.save(),
        user: await user.save()
    }
}

function getUser(id: number): Promise<User | null> {
    return User.findOne({
        where: { id },
        relations: {
            profile: true,
            pet: true,
            chats: true
        }
    })
}

function getChat(id: number): Promise<Chat | null> {
    return Chat.findOne({
        where: { id },
        relations: {
            users: { profile: true, pet: true }
        }
    })
}
