import { createSlice } from '@reduxjs/toolkit'

function getInitialState() {
    return {
        open: false,
        message: "",
        state: "success",
        loading: false
    }
}


const errorSlice = createSlice({
    name: 'error',
    initialState: getInitialState(),
    reducers: {
        setError(state, action) {
            for (const key in action.payload)
                state[key] = action.payload[key]
            return state
        },
    }
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer