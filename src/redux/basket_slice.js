import { createSlice } from '@reduxjs/toolkit'
import APP_URL from '../Data/APP_URL'

function getInitialState() {
    try {
        const basket = JSON.parse(localStorage.getItem("basket"))
        if (basket) return basket
        else return []
    } catch {
        return []
    }
}

function saveStateToLocalStorage(state) {
    localStorage.setItem("basket", JSON.stringify(state))
}

const basketSlice = createSlice({
    name: 'basket',
    initialState: getInitialState(),
    reducers: {
        increment(state, action) {
            const typeItem = action.payload.item,
                product = action.payload.product
            if (!state) {
                localStorage.setItem("state", JSON.stringify([]))
                state = []
            }
            let basketItem = state.find(bs => bs._id === typeItem._id)
            if (basketItem) {
                basketItem.count += 1;
                basketItem.type.count += 1;
            } else {
                let newBasketItem = {
                    product,
                    type: { ...typeItem, count: 1 },
                    name: product.name,
                    count: 1,
                    _id: typeItem._id,
                    size: typeItem.size,
                    price: typeItem.price,
                    offPrice: (typeItem.price * (100 - (product.off_percent ?? 0)) / 100),
                    discount: product.off_percent,
                    productId: product._id,
                    categoryId: product.category._id,
                    imageUrl: product.pic_url,
                    pack: product.packprice,
                }
                
                state.push(newBasketItem)
            }
            saveStateToLocalStorage(state)
            return state
        },
        decrement(state, action) {
            let typeItem = action.payload.item
            let item = state.find(type => type._id === typeItem._id)
            if (item.count === 1) {
                state = state.filter(type => type._id !== item._id)
            } else {
                item.count -= 1;
                item.type.count -= 1;
            }
            saveStateToLocalStorage(state)
            return state
        },
        emptyBasket(state) {
            state = []
            saveStateToLocalStorage(state)
            return state
        }
    }
})

export const { increment, decrement, emptyBasket } = basketSlice.actions

export default basketSlice.reducer