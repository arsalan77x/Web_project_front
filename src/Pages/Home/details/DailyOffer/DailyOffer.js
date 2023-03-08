import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "./slider.scss";
import logo from "./logo.png"
import { Grow, Typography } from "@material-ui/core";
import ProductSkeleton from "../../../../components/cards/ProductSkeleton/ProductSkeleton";
import ProductsCard from "../../../../components/cards/ProductsCard/ProductsCard";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import dataProvider from "../../../../Data/dataProvider";
SwiperCore.use(Navigation);

const DailyOffer = () => {
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const [loading, setLoading] = useState(true)
  const [dailyProducts, setDailyProducts] = useState([])

  useEffect(() => {
    getDailyOffer()
  }, [])

  const getDailyOffer = async () => {
    setLoading(true)
    let data = await dataProvider.getList('product/list/menu?filter={"daily_offer":true}')
    console.log(data)
    if (data)
      setDailyProducts(data[0].products)
    setLoading(false)
  }

  const dailyOfferProducts = dailyProducts.map((item, index) =>
    <SwiperSlide key={item.id}>
      <ProductsCard product={item} categoryId={item.category.id} index={index} type={"dailyOffer"} loading={loading} />
    </SwiperSlide>
  )

  const productSkeletons = Array.from(new Array(5)).map(item =>
    <SwiperSlide>
      <ProductSkeleton />
    </SwiperSlide>
  )

  return (
    <div className="dailyOfferContainer">

      <div className="firstSliderItem">
        <Typography variant="h6" >پیشنهاد روزانه</Typography>
        <img src={logo} width="80px" height="80px" />
      </div>


      <Swiper
        slidesPerView={!matches ? 5 : 1}
        navigation
        freeMode
        className="dailyOffer">
        {loading ? productSkeletons : dailyOfferProducts}
      </Swiper>

    </div>
  )
}

export default DailyOffer;
