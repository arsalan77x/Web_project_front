import React, { useEffect, useState } from "react"
import "./SlideShow.scss"
import APP_URL from "../../../../Data/APP_URL";
import dataProvider from "../../../../Data/dataProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import "swiper/swiper.scss";

SwiperCore.use([Autoplay]);

const SlideShow = props => {

    const getSliderImages = async () => {
        let data = await dataProvider.getList("slider/list")
        if (data) setImages(data)
    }

    const [images, setImages] = useState([])

    useEffect(() => {
        getSliderImages()
    }, [])


    return (
        <div className="SlideShowContainer">
            <Swiper slidesPerView={1} autoplay={{
                    delay: 6000,
                    disableOnInteraction: false
                }}>
                {images.map(item => <SwiperSlide key={item.id}> <img src={APP_URL + item.pic_url} className="slideShowImage" /> </SwiperSlide>)}
            </Swiper>
        </div>
    )
}


export default SlideShow