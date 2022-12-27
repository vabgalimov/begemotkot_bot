import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
import { ranks } from "consts/rank"

@Entity()
export class Profile extends BaseEntity {
    constructor(user?: User) {
        super()
        if (!user)
            return
        this.vip = "none"
        this.template = "default"
        this.messages = 0
        this.rating = 0
        this.duelWins = 0
        this.duelTotal = 0
        this.coins = 0
        this.bonusGotDate = 0
        this.user = user
    }

    @PrimaryGeneratedColumn()
    rowid: number

    @Column()
    vip: "none" | "min" | "full"

    @Column()
    template: string

    @Column()
    messages: number

    get rank(): string {
        const rank = ranks.findIndex(rank => rank.maxMessages > this.messages)
        const rankName = `${rank + 1}`
        return rankName
    }

    @Column()
    rating: number

    @Column()
    duelWins: number

    @Column()
    duelTotal: number

    @Column()
    coins: number

    @Column()
    bonusGotDate: number

    /** in minutes */
    get bonusGot(): number {
        const ms = Date.now() - this.bonusGotDate
        return ms / 60_000 | 0
    }

    @OneToOne(() => User, user => user.profile)
    user: User
}
