import { comp } from "./composer"
import { SessionData } from "types/session"
import { Chat } from "database/entity/chat"
import { User } from "database/entity/user"
import { Chat as TelegramChat, User as TelegramUser } from "grammy/out/types"

comp.use(async (ctx, next) => {
    await updateSession(ctx.from, ctx.chat)
    if (ctx.msg.reply_to_message?.from)
        await updateSession(ctx.msg.reply_to_message.from)
    ctx.session = {
        get: getSession,
        create: createSession,
        ...(
            await getSession(ctx.from.id, ctx.chat.id) ??
            await createSession(ctx.from, ctx.chat)
        )
    }
    await next()
})

async function getSession(user_id: number, chat_id?: number): Promise<SessionData | null> {
    const user = await User.findOne({
        where: { id: user_id }
    })
    if (!user)
        return null
    if (!chat_id)
        return { user }
    const chat = await Chat.findOne({
        where: { id: chat_id }
    })
    return { chat: chat ?? undefined, user }
}

async function createSession(tgUser: TelegramUser, tgChat?: TelegramChat): Promise<SessionData> {
    const session = {
        chat: tgChat ? new Chat(tgChat) : undefined,
        user: new User(tgUser)
    }
    await session.user.save()
    if (session.chat)
        await session.chat.save()
    console.log("wtf", session.chat)
    return session
}

async function updateSession(tgUser: TelegramUser, tgChat?: TelegramChat): Promise<void> {
    const session = await getSession(tgUser.id, tgChat?.id)
    if (!session)
        return
    const user = new User(tgUser)
    user.rowid = session.user.rowid
    session.user = await user.save()
    if (!session.chat && tgChat) {
        await new Chat(tgChat).save()
        return
    }
    const chat = new Chat(tgChat)
    chat.rowid = session.chat!.rowid
    session.chat = await chat.save()
}
