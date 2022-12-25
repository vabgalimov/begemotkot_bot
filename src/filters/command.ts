import { i18n } from "utils/i18n"
import { MyContext } from "types/context"

export function command(key: string, testArgs?: RegExp, ignoreCase = false) {
    const reFlags = ignoreCase ? "i" : undefined
    const reArgsSrc = testArgs ? "\\s+" + testArgs.source.replace(/\s+/g, "\\s+") : ""

    const commands: RegExp[] = []
    for (const lang of i18n.languages) {
        for (const raw of getRawCommands(lang, key)) {
            commands.push(new RegExp("^" + raw + reArgsSrc + "$", reFlags))
        }
    }

    return (ctx: MyContext): boolean => {
        const text = ctx.message?.text
        if (!text) return false
        return commands.some(command => {
            ctx.match = text.match(command) ?? undefined
            return !!ctx.match
        })
    }
}

function getRawCommands(lang: string, key: string) {
    const raw: string[] | string | undefined = i18n.getResource(lang, "tr", key)

    if (raw instanceof Array)
        return raw
    if (typeof raw === "string")
        return raw.split(",").map(s => s.trim())

    if (!raw)
        throw new Error(`Command '${key}'[${lang}] not found`)
    throw new Error(`Command '${key}'[${lang}] is not string or array`)
}
