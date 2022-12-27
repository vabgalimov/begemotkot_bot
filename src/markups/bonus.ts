import { InlineKeyboardButton } from "grammy/out/types.node"
import { hiddenItem, items as initItems } from "consts/bonus"
import { Random } from "utils/random"

export function initField(state: { items: string[][] }): InlineKeyboardButton.CallbackButton[][] {
    state.items = Random.shuffle(initItems.flat()).unflat(initItems[0].length)
    return state.items.map((row, i) => {
        return row.map((_, j) => {
            return { text: hiddenItem, callback_data: `bonus-item-${i}-${j}` }
        })
    })
}
