import React, { useEffect, useState } from "react"
import SlideShow from "./details/SlideShow/SlideShow"
import DailyOffer from "./details/DailyOffer/DailyOffer"
import MobileCategory from "./details/MobileCategory/MobileCategory"
import MobileFilter from "./details/MobileFilter/MobileFilter"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AboutUs from "../../components/AboutUs/AboutUs"
import ContactUs from "../../components/ContactUs/ContactUs"
import HomeFooter from "../../components/Footer/Footer"
import Products from "./details/Products/Products"
import { ProductsProvider } from "../../Data/ProductsContext"
import dataProvider from "../../Data/dataProvider"

const Home = props => {
    const [loading, setLoading] = useState(true)
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    useEffect(() => {
        dataProvider.getOne("report/newview")
    }, [])
    return (
        <div>
            <SlideShow />
            <DailyOffer />
            {matches && <MobileCategory />}
            <ProductsProvider>
                {matches && <MobileFilter loading={loading} setLoading={setLoading} />}
                <Products loading={loading} setLoading={setLoading} />
            </ProductsProvider>
            {matches ? null : <AboutUs />}
            {matches ? null : <ContactUs />}

            <HomeFooter />
        </div>
    )
}

export default Home