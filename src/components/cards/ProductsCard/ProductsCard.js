import React from "react"
import DesktopProductsCard from "./DesktopProductsCard/DesktopProductsCard"
import MobileProductsCard from "./MobileProductsCard/MobileProductsCard"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ProductsCard = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    return (
        <div>
            {!matches ?
                <DesktopProductsCard product={props.product} categoryId={props.categoryId}
                    index={props.index} loading={props.loading}/>
                :
                <MobileProductsCard product={props.product} categoryId={props.categoryId}
                    index={props.index} type={props.type} loading={props.loading}/>}
        </div>
    )
}

export default ProductsCard