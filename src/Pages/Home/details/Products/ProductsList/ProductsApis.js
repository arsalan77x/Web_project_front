import dataProvider from "../../../../../Data/dataProvider"

export const getProducts = async (prodcutCotntext, setLoading) => {
    setLoading(true)
    let data = await dataProvider.getList("product/list/menu")
    if (data) {
        var i = 0, length = data.length
        var products = []
        while (i < length) {
            if (data[i].products.length !== 0)
                products.push(data[i])
            i++
        }
        prodcutCotntext.setProducts(products)
    }
    setLoading(false)
}