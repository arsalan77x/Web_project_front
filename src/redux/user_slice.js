import { createSlice } from '@reduxjs/toolkit'

function getInitialState() {
    const initialState = {
        name: "",
        phone:"",
        id:"",
        login: false,
        token: undefined,
        order: {address:{}}
    }
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) return user
        else return initialState
    } catch {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    localStorage.setItem("user", JSON.stringify(state))
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser(state, action) {
            for (const key in action.payload)
                state[key] = action.payload[key]
            saveStateToLocalStorage(state)
            return state
        },
        emptyUser(state) {
            state.order = {address:{}}
            saveStateToLocalStorage(state)
            return state
        }
    }
})

export const { setUser, emptyUser } = userSlice.actions

export default userSlice.reducer