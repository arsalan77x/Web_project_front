import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products_without_off: 0,
    off: 0,
    products_with_off: 0,
    pack: 0,
    send: 0,
    total: 0,
    shop_deliver: false
}
function getInitialState() {
    try {
        const prices = JSON.parse(localStorage.getItem("prices"))
        if (prices) return prices
        else return initialState
    } catch {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    localStorage.setItem("prices", JSON.stringify(state))
}

const priceSlice = createSlice({
    name: 'prices',
    initialState: getInitialState(),
    reducers: {
        setPrices(state, action) {
            for (const key in action.payload)
                state[key] = action.payload[key]
            saveStateToLocalStorage(state)
            return state
        },
        emptyPrices(state) {
            state.products_without_off = initialState.products_without_off
            state.off = initialState.off
            state.products_with_off = initialState.products_with_off
            state.pack = initialState.pack
            state.send = initialState.send
            state.total = initialState.total
            state.shop_deliver = initialState.shop_deliver
            saveStateToLocalStorage(state)
            return state
        }
    }
})

export const { setPrices, emptyPrices } = priceSlice.actions

export default priceSlice.reducer