import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("rowid")
    rowid: number

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true, nullable: true })
    username?: string
}
