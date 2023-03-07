import React, { useState } from "react"
import "./Products.scss"
import ProductsSearch from "./ProductsSearch/ProductsSearch"
import ProductsList from "./ProductsList/ProductsList"
import ProductsBasket from "./ProductsBasket/ProductsBasket"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Products = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.up('sm'))
    return (
        <div className="HomeProductsContainer">
            {matches && <ProductsSearch loading={props.loading} setLoading={props.setLoading} />}
            <div className="ProductsContainer">
                <ProductsList loading={props.loading} setLoading={props.setLoading} />
            </div>
            {matches && <ProductsBasket />}

        </div>
    )

}

export default Products