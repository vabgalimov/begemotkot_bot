import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Profile extends BaseEntity {
    constructor(user?: User) {
        super()
        if (!user)
            return
        this.vip = 0
        this.template = "default"
        this.messages = 0;
        this.rating = 0;
        this.coins = 0;
        this.duelWins = 0;
        this.duelTotal = 0;
        this.user = user
    }

    @PrimaryGeneratedColumn()
    rowid: number

    @Column()
    vip: number

    @Column()
    template: string

    @Column()
    messages: number

    @Column()
    rating: number

    @Column()
    duelWins: number

    @Column()
    duelTotal: number

    @Column()
    coins: number

    @OneToOne(() => User, user => user.profile)
    user: User
}
