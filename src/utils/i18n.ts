import i18next from "i18next"
import { sync as glob } from "fast-glob"
import YAML from "yaml"
import { dset } from "dset"
import fs from "fs"

interface Resources {
    [lang: string]: {
        tr: {
            [key: string]: any
        }
    }
}
const resources: Resources = {}

for (const path of glob("locales/**/*.yaml")) {
    const data = YAML.parse(fs.readFileSync(path, "utf-8"))
    const keys = path
        .replace("locales/", "")
        .replace(".yaml", "")
        .split("/").join(".")
    dset(resources, keys, data)
}
for (const lang in resources)
    resources[lang] = { tr: resources[lang] }

export const i18n = i18next.createInstance({
    fallbackLng: "ru",
    defaultNS: "tr",
    initImmediate: false,
    interpolation: {
        nestingPrefix: "%{",
        nestingSuffix: "}",
        prefix: "${",
        suffix: "}"
    },
    resources
})
i18n.init()
