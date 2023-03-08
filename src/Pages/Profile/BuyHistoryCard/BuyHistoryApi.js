import dataProvider from "../../../Data/dataProvider"
import store from "../../../redux/store"

export const buyHistory = async (setBuyHistoryCards) => {
    let data = await dataProvider.getOne("order/list/" + store.getState().user.id)
    if (data) 
        setBuyHistoryCards(data)
}