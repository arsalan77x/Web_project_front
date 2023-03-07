import dataProvider from "../../Data/dataProvider"
import { logout } from "../../Data/Utils"
import { setError } from "../../redux/error_slice"
import store from "../../redux/store"

export const exitAccount = async () => {
    store.dispatch(setError({loading:true}))
    let data = await dataProvider.sendInformation("customer/signout", {})
    logout()
}