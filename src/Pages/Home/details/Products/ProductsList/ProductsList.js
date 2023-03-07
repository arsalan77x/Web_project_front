import React, { useContext, useEffect, useState } from "react"
import "./ProductsList.scss"
import { getProducts } from "./ProductsApis"
import ProductSkeleton from "../../../../../components/cards/ProductSkeleton/ProductSkeleton"
import Masonry from "react-responsive-masonry"
import { ProductsContext } from "../../../../../Data/ProductsContext"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProductsCard from "../../../../../components/cards/ProductsCard/ProductsCard"

const ProductsList = props => {

    const prodcutCotntext = useContext(ProductsContext)
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    useEffect(() => {
        // getProducts(prodcutCotntext, props.setLoading)
    }, [])
    const productsListItem = prodcutCotntext.products.map((item, index) =>
        item.products.length != 0 &&
        <div id={"category_" + index} key={item.category._id}>
            <p className="categoryTitle">{item.category.name}</p>
            <br />
            <br />
            {!matches ?
                <Masonry columnsCount={3}>
                    {item.products.map((item2, index) =>
                        <ProductsCard key={item2.id} product={item2} categoryId={item.category.id} index={index} loading={props.loading} />
                    )}
                </Masonry>
                :
                item.products.map((item2, index) =>
                    <ProductsCard key={item2.id} product={item2} categoryId={item.category.id} index={index} loading={props.loading} />
                )
            }
        </div>)



    const productSkeletons = Array.from(new Array(5)).map(item =>
        <div>
            {Array.from(new Array(3)).map(el =>
                <ProductSkeleton />
            )}
        </div>
    )

    return (
        <div className="ProductsListContainer">
            {props.loading ? productSkeletons : productsListItem}
        </div>
    )
}


export default ProductsList