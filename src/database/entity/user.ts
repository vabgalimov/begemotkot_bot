import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User as TelegramUser } from "grammy/out/types"
import { Profile } from "./profile"
import { Chat } from "./chat"
import { Pet } from "./pet"

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
        this.profile = new Profile(this)
        this.pet = new Pet(this)
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

    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    @JoinColumn()
    profile: Profile

    @OneToOne(() => Pet, pet => pet.owner, { cascade: true })
    @JoinColumn()
    pet: Pet

    @ManyToMany(() => Chat, chat => chat.users)
    @JoinTable()
    chats: Chat[]
}
