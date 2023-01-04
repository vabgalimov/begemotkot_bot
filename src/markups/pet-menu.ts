import { InlineKeyboardButton } from "grammy/out/types"
import { TFunction } from "i18next"
import { prices } from "consts/pet-menu"

export function getPetActions(t: TFunction): InlineKeyboardButton.CallbackButton[][] {
    const feedText = t("pet-menu.actions.feed", { price: prices.feed })
    const trainText = t("pet-menu.actions.train", { price: prices.train })
    return [
        [{ text: feedText, callback_data: "pet-menu-feed" }],
        [{ text: trainText, callback_data: "pet-menu-train" }]
    ]
}
