import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { User as TelegramUser } from "grammy/out/types"

@Entity()
export class User extends BaseEntity {
    constructor(user?: TelegramUser) {
        super()
        if (!user)
            return
        this.id = user.id
        this.name = user.first_name
        this.username = user.username
        this.language_code = user.language_code ?? "ru"
    }

    @PrimaryGeneratedColumn()
    rowid: number

    @Column({ unique: true })
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: true })
    username?: string

    @Column()
    language_code: string
}
