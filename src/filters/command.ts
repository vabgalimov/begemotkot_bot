import { i18n } from "utils/i18n"
import { MyContext } from "types/context"

export default (key: string, testArgs?: RegExp, prefix = "!") => {
    const commands: RegExp[] = []
    for (const lang of i18n.languages) {
        const raws = getRawCommands(lang, key)
        if (!raws) continue

        const reArgsSrc = testArgs ? "\\s+" + testArgs.source.replace(/\s+/g, "\\s+") : ""
        for (const raw of raws) {
            const re = new RegExp(prefix + raw + reArgsSrc)
            commands.push(re)
        }
    }

    return (ctx: MyContext): boolean => {
        const text = ctx.message?.text
        if (!text) return false
        return commands.some(c => {
            const m = text.match(c)
            if (!m) return false
            ctx.match = m
            return true
        })
    }
}


function getRawCommands(lang: string, key: string) {
    let raw: string | null
    raw   = i18n.getResource(lang, "tr", key + ".cmd")
    raw ??= i18n.getResource(lang, "tr", key)

    return raw?.split(",").map(s => s.trim())
}
