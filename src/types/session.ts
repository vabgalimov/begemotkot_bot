import { Chat } from "database/entity/chat"
import { User } from "database/entity/user"

export interface SessionData {
    chat?: Chat
    user: User
}
