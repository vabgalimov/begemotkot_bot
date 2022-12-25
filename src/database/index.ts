import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "begemot.db3",
    entities: [`${__dirname}/entity/*.js`],
    synchronize: true
})
