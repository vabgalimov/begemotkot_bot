import { i18n } from "utils/i18n";
import { menu as rawMenu } from "consts/help-menu"
import { env } from "env"

export const helpMenu: Record<string, string> = {}

for (const lang of i18n.languages) {
    const t = i18n.getFixedT(lang, "tr")
    const menu: string[] = []
    for (const line of rawMenu) {
        const buf = []
        const elts = line.split(/([#$][A-Za-z0-9\-\.]+)/g)
        for (const el of elts) {
            let text: string
            if (el.startsWith("#")) {
                const key = el.slice(1)
                text = t(key, env)
            }
            else if (el.startsWith("$")) {
                const replyRequired = el.startsWith("$!")
                const key = el.slice(+replyRequired + 1)
                let commands = t(key + ".command", { returnObjects: true }) as string | string[]
                if (typeof commands == "string") {
                    commands = [commands]
                }
                const desc = t(key + ".desc")
                const args = t(key + ".args", { returnObjects: true })
                let argsText = ""
                if (args instanceof Array<string>) {
                    argsText = args.map(a => ` [${a}]`).join("")
                }
                let replyRequiredText = ""
                if (replyRequired) {
                    replyRequiredText = ` (${t("help.reply-required")})`
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
