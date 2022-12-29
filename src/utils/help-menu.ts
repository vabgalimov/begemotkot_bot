import { i18n } from "utils/i18n";
import { menu as rawMenu } from "consts/help-menu"

export const helpMenu: Record<string, string> = {}

for (const lang of i18n.languages) {
    const menu: string[] = []
    for (const line of rawMenu) {
        const buf = []
        const elts = line.split(/([#$][A-Za-z0-9\-\.]+)/g)
        for (const el of elts) {
            let text: string
            if (el.startsWith("#")) {
                const key = el.slice(1)
                text = i18n.getResource(lang, "tr", key)
            }
            else if (el.startsWith("$")) {
                const replyRequired = el.startsWith("$!")
                const key = el.slice(+replyRequired + 1)
                let commands = i18n.getResource(lang, "tr", key + ".command")
                if (typeof commands == "string")
                    commands = [commands]
                const desc = i18n.getResource(lang, "tr", key + ".desc")
                const args = i18n.getResource(lang, "tr", key + ".args")
                let argsText = ""
                if (args instanceof Array<string>) {
                    argsText = " " + args.map(a => `[${a}]`).join(" ")
                }
                let replyRequiredText = ""
                if (replyRequired) {
                    const text = i18n.getResource(lang, "tr", "help.reply-required")
                    replyRequiredText = ` (${text})`
                }
                text = `${commands.join(", ")}${argsText}${replyRequiredText} - ${desc}`
            }
            else {
                text = el
            }
            buf.push(text)
        }
        menu.push(buf.join(""))
    }
    helpMenu[lang] = menu.join("\n")
}
