import { MyContext } from "types/context"
import { ChatMemberUpdated } from "grammy/out/types"

type FilteredContext<C> = C & {
    myChatMember: ChatMemberUpdated
}

export function botWasAdded() {
    return <C extends MyContext>(ctx: C): ctx is FilteredContext<C> => {
        if (ctx.chat.type != "group" && ctx.chat.type != "supergroup")
            return false
        if (!ctx.myChatMember)
            return false
        const { status } = ctx.myChatMember.new_chat_member
        return status == "member" || status == "administrator"
    }
}

export function botWasRemoved() {
    return <C extends MyContext>(ctx: C): ctx is FilteredContext<C> => {
        if (ctx.chat.type != "group" && ctx.chat.type != "supergroup")
            return false
        if (!ctx.myChatMember)
            return false
        const { status } = ctx.myChatMember.new_chat_member
        return status == "left" || status == "kicked"
    }
}
