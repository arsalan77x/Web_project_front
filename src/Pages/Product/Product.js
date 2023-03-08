import React, { useEffect, useState } from "react"
import "./Product.scss"
import Footer from "../../components/Footer/Footer"
import { getProduct } from "./ProductApi"

import APP_URL from "../../Data/APP_URL"
import ProductCounter from "../../components/ProductCounter/ProductCounter"
import Rating from '@material-ui/lab/Rating';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProductsCard from "../../components/cards/ProductsCard/ProductsCard"
import { useParams } from "react-router-dom"

const ProductPageType = props => {
    
    return (
        <div className="productPageTypeItem">
            <p className="productPageSize">{props.item.size}</p>

            <div className="productPageTypeItemPriceContainer">
                {(props.discount ?
                    <del className="productPageDeletedPrice"> {props.item.price.toLocaleString()}</del>
                    : null)}
                <p className="productPagePrice"> props.item.price.toLocaleString()</p>
            </div>

            <ProductCounter
                item={props.item}
                product={props.product}
            />
        </div>
    )
}



const Product = props => {

    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const [product, setProduct] = useState({})
    const [similars, setSimilars] = useState([])
    const {id, category} = useParams()

    useEffect(() => {
        getProduct(setProduct,setSimilars,  id, category)
    }, [id])

    return (
        <div>
            <ContentWrapper>

                {/* <div className="productPageHeaderDetails">
                    <p className="productPageName">{product.name}</p>
                    <p className="productPageCategory"> دسته بندی: {product.category}</p>
                </div> */}

                <div className="productPageHeader">

                    <div className="productPageImageContainer">
                        {product.pic_url && <img src={APP_URL + product.pic_url} width="100%" />}
                        

                    </div>


                    <div className="productPageItemsContainer">
                        <div className="productPageNameContainer">
                            <p className="productPageName">{product.name}</p>
                        </div>
                        <Rating
                            readOnly
                            value={5}
                        // onChange={(event, newValue) => {
                        //     setRate(newValue);
                        // }}
                        />
                        {product.types ?
                            product.types.map(item =>
                                <ProductPageType
                                    item={item}
                                    key={item._id}
                                    product={product} />
                            )
                            : null}
                    </div>

                </div>

                {/* <Card className="productPageBodyContainer"> */}
                {/* <div className="productPageProductDetails" */}
                {/* dangerouslySetInnerHTML={{ __html: product.materials }}> */}

                {/* </div> */}
                {/* <div className="productPageCaption">
                        توضیحات 
                        <div/>
                        {product.caption}
                    </div> */}
                {/* </Card> */}

                <p className="productPageSimilarProductsTitle">محصولات مشابه</p>
                <div className="productPageSimilarProductsContainer">
                    {similars &&  Array.isArray(similars) ?
                            <Swiper slidesPerView={!matches ? 5 : "auto"}
                                navigation className="productPageSwiper" freeMode >
                                {similars.map((item, index) =>
                                    <SwiperSlide key={item.id}>
                                        <ProductsCard product={item}
                                            categoryId={item.category}
                                            index={index} />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            : null
                    }
                </div>
            </ContentWrapper>
            <Footer />
        </div>
    )
}

export default Product