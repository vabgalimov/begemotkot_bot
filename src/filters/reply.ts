import { Message } from "grammy/out/types.node"
import { MyContext } from "types/context"

type FilteredContext<C> = C & {
    msg: Message & {
        reply_to_message: Message
    }
}

export function reply() {
    return <C extends MyContext>(ctx: C): ctx is FilteredContext<C> => {
        return !!ctx.msg?.reply_to_message
    }
}
