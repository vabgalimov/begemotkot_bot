import { TFunction } from "i18next"

export interface I18nFlavor {
    locale: string
    t: TFunction
}
