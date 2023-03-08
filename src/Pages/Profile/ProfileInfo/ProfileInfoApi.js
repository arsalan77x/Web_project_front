import dataProvider from "../../../Data/dataProvider"
import { setError } from "../../../redux/error_slice"
import store from "../../../redux/store"
import { setUser } from "../../../redux/user_slice"

export const getUserProfile = async (setPersonInfo, setGender) => {
    let id = store.getState().user.id
    let data = await dataProvider.getOne("customer/one/" + id)
    if (data) {
        setPersonInfo(data)
        setGender(data.gender)
    }
}

export const changeProfileInfo = async (setPersonInfo, name, nationId, city, email, birthday, job, gender, setGender) => {

    store.dispatch(setError({loading:true}))
    let personInfo =
    {
        email: email,
        name: name,
        gender: gender,
        job: job,
        city: city,
        birthday: birthday,
        nation_id: nationId,
    }

    let data = await dataProvider.update("customer/one/" + store.getState().user.id, { data: personInfo })
    let data2 = await dataProvider.getOne("customer/one/" + store.getState().user.id)
    if (data2) {
        setPersonInfo(data2)
        setGender(data2.gender)
        const label = "تغییراطلاعات با موفقیت انجام شد!"
        store.dispatch(setError({ open: true, message: label, state: "success" }))
        store.dispatch(setUser({phone: data2.phone, name: data2.name}))
    }
    store.dispatch(setError({loading:false}))
}