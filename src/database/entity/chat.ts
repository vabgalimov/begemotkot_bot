import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Chat as TelegramChat } from "grammy/out/types"
import { User } from "./user"

@Entity()
export class Chat extends BaseEntity {
    constructor(chat?: TelegramChat) {
        super()
        if (!chat)
            return
        this.id = chat.id
        this.type = chat.type
        this.name = "title" in chat ? chat.title : chat.first_name
        this.username = "username" in chat ? chat.username : undefined
    }

    @PrimaryGeneratedColumn()
    rowid: number

    @Column({ unique: true })
    id: number

    @Column()
    type: "private" | "group" | "supergroup" | "channel"

    @Column()
    name: string

    @Column({ unique: true, nullable: true })
    username?: string

    @ManyToMany(() => User, user => user.chats)
    users: User[]
}
