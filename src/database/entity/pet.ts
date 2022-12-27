import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Pet extends BaseEntity {
    constructor(owner?: User) {
        super()
        if (!owner)
            return
        this.name = "🦛"
        this.size = 0
        this.power = 0
        this.battleWins = 0
        this.battleTotal = 0
        this.owner = owner
    }

    @PrimaryGeneratedColumn()
    rowid: number

    @Column()
    name: string

    @Column()
    size: number

    @Column()
    power: number

    @Column()
    battleWins: number

    @Column()
    battleTotal: number

    @OneToOne(() => User, user => user.pet)
    owner: User
}
