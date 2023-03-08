import dataProvider from "../../Data/dataProvider"

export const getProduct = async (setProduct, setSimilars, productId, categoryId) => {
    let data = await dataProvider.getOne("product/one/" + productId)
    if (data)
        setProduct(data)
    let data3 = await dataProvider.getOne("product/menu/" + categoryId)
    if (data3) {
        data3 = data3.filter(e => e.id != productId)
        data3 = data3.map(item => ({...item, category:{id:item.category}}))
        setSimilars(data3)
    }
}