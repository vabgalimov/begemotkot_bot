import { DEBUG_LEVEL } from "env"

export enum DebugLevel {
    ERROR,
    WARNING,
    INFO
}

export class Debug {
    private constructor() {}

    static write(message: string, level: DebugLevel) {
        if (DEBUG_LEVEL >= level) {
            const now = new Date().toISOString().match(/\d\d:\d\d:\d\d/)![0]
            const lvl = DebugLevel[level]
            console.log(`[${now} ${lvl}] ${message}`)
        }
    }

    static log(message: string) { Debug.write(message, DebugLevel.INFO) }
    static warn(message: string) { Debug.write(message, DebugLevel.WARNING) }
    static error(message: string) { Debug.write(message, DebugLevel.ERROR) }
}
