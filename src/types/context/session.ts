import { SessionData } from "../session"

export interface SessionFlavor {
    session: SessionData & {
        get(user_id: number, chat_id?: number): Promise<SessionData | null>

        /** If not reply, then alias for ctx.session */
        reply_to_session: SessionData
    }

    /** Alias for ctx.session.user.profile */
    profile: SessionData["user"]["profile"]

    /** Alias for ctx.session.user.pet */
    pet: SessionData["user"]["pet"]
}
