import basketReducer from "./basket_slice";
import errorReducer from "./error_slice";
import priceReducer from "./prices_slice";
import userReducer from "./user_slice";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        prices: priceReducer,
        basket: basketReducer,
        error: errorReducer,
        user: userReducer
    }
})

export default store