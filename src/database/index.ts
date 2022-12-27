import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "begemot.db3",
    entities: [`${__dirname}/entity/*.js`],
    enableWAL: true,
    synchronize: true
})
