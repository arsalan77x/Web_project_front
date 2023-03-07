import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "./MobileCategory.scss";
import APP_URL from "../../../../Data/APP_URL";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { addEventListener, scrollToCategory } from "../Products/ProductsSearch/ProductsSearchApi";
import dataProvider from "../../../../Data/dataProvider";

SwiperCore.use(Navigation)

const MobileCategory = () => {

    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const [activeLink, setActiveLink] = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let data = await dataProvider.getList("category/list")
        if (data)
            setCategories(data)
    }

    const categorySkeletons = Array.from(new Array(4)).map(item =>
        <SwiperSlide>
            <Skeleton variant="circle" width={50} height={50} />
        </SwiperSlide>
    )
    return (
        <div className="swiperContainer">
            <Swiper spaceBetween={1} slidesPerView={4} navigation className="swiperMobile" onInit={myswiper => {
                addEventListener(setActiveLink, myswiper, "mobileLink")
            }}
            >

                {categories.length === 0 ? categorySkeletons :
                    categories.map((item, index) =>
                        < SwiperSlide key={item._id}>
                            <Box name="mobileLink">
                                <div
                                    className={(activeLink === index) ? "mobileCategoryActive" : "mobileCategory"}
                                    onClick={(e) => scrollToCategory(index, e, setActiveLink, matches)}>
                                    <img src={APP_URL + item.icon} className="mobileCategoryImage" />
                                    <p>{item.name}</p>
                                </div>
                            </Box>
                        </SwiperSlide >
                    )}

            </Swiper>
        </div>
    );
};

export default MobileCategory;
