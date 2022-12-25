import { SessionData } from "../session"
import { Chat, User } from "grammy/out/types"

export interface SessionFlavor {
    session: SessionData & {
        get(user_id: number, chat_id?: number): Promise<SessionData | null>
        update(user: User, chat?: Chat): Promise<SessionData>
    }
}
