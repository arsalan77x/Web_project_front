import dataProvider from "../../Data/dataProvider"
import store from "../../redux/store"

export const getOrder = async (id, setFactorDetail) => {
    let data = await dataProvider.getList("order/list/" + store.getState().user.id, {filter: {_id: id}})
    if (data && data[0]) {
        setFactorDetail(data[0])
    }
}
