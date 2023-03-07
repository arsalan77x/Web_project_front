import dataProvider from "../../../../../Data/dataProvider"

export const search = async (productContext, searchText, cancelToken, setLoading) => {
    if (setLoading) setLoading(true)
    const regex = { name: searchText }
    let data = await dataProvider.getList('product/list/menu', {regex}, cancelToken)
    if (data) productContext.setProducts(data)
    if (setLoading) setLoading(false)
}

export const addEventListener = (setActiveLink, swiper, link) => {

    window.addEventListener("scroll", event => {
        let fromTop = window.scrollY;
        let mainNavLinks = document.getElementsByName(link);
        let categoryContainer = document.getElementById("productsSearchTypeContainer");


        if (mainNavLinks)
            mainNavLinks.forEach((link, index) => {
                let section = document.getElementById("category_" + index);


                if (section && section.offsetTop - 400 <= fromTop) {
                    setActiveLink(index)

                    if (categoryContainer) {
                        var topPos = link.offsetTop;
                        categoryContainer.scrollTop = topPos - 200;
                    }

                    if (swiper) {
                        swiper.slideTo(index, 10, true);
                    }
                }
            })
    })
}

export const scrollToCategory = (index, event, setActiveLink, matches) => {
    event.preventDefault()
    const element = document.getElementById("category_" + index)
    if (element) {
        if (!matches) {
            window.scrollTo(1000, element.offsetTop - 80)
        } else {
            window.scrollTo(1000, element.offsetTop - 235)
        }
    }
    setActiveLink(index)
}