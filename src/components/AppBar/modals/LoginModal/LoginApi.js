import dataProvider from "../../../../Data/dataProvider"
import { setError } from "../../../../redux/error_slice"
import store from "../../../../redux/store"
import { setUser } from "../../../../redux/user_slice"

export default async function login(username, password, setInputError, setOpen) {
    console.log(username)
    if (username === "") {
        setInputError({ user: true, userText: "لطفا شماره تلفن خود را وارد کنید", pass: false, passText: "" })
    }
    else if (password === "") {
        setInputError({ user: false, userText: "", pass: true, passText: "لطفا رمز خود را وارد کنید" })
    } else if (password.length < 4) {
        setInputError({ user: false, userText: "", pass: true, passText: "رمز عبور نمیتواند کمتر از 4 کاراکتر داشته باشد" })
    } else {
        store.dispatch(setError({ loading: true }))
        let personInfo = {
            username: username,
            password: password
        }

        let data = await dataProvider.sendInformation("customer/signin", { data: personInfo })
        store.dispatch(setError({ loading: false }))
        if (data?.tokens) {
            store.dispatch(setUser({ name: data.customer.name, id: data.customer._id, token: data.tokens.accessToken, login: true }))
            localStorage.setItem("token", data.tokens.accessToken)
            sessionStorage.setItem("token", data.tokens.accessToken)
            setOpen(false)
            const label = store.getState().user.name + " " + "به بستنی طرشت خوش آمدید !"
            store.dispatch(setError({ open: true, message: label, state: "success" }))
        } 
        store.dispatch(setError({ loading: false }))
    }
}