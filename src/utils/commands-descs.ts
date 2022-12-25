import { i18n } from "utils/i18n"
import { Debug } from "utils/debugger"
import { inspect } from "util"

const commandKeys = [
    "profile",
]

interface CommandDesc {
    commands: string[]
    description: string
}

export const commandDescriptions: { [lang: string]: CommandDesc[] } = {}

for (const lang of i18n.languages) {
    const descs: CommandDesc[] = []
    for (const key of commandKeys) {
        const commands: string | string[] | undefined = i18n.getResource(lang, "tr", key + ".command")
        const desc: string | undefined = i18n.getResource(lang, "tr", key + ".desc")
        if (!commands || !desc) {
            Debug.warn(`Command description for '${key}' not found`)
            continue
        }
        descs.push({
            commands: typeof commands === "string" ? [commands] : commands,
            description: desc
        })
    }
    commandDescriptions[lang] = descs
}

Debug.log(inspect(commandDescriptions.ru))
