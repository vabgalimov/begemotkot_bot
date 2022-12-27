import { SessionData } from "../session"

export interface SessionFlavor {
    session: SessionData & {
        get(user_id: number, chat_id?: number): Promise<SessionData | null>
    }

    /** Alias for ctx.session.user.profile */
    profile: SessionData["user"]["profile"]

    /** Alias for ctx.session.user.pet */
    pet: SessionData["user"]["pet"]
}
