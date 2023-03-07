import React from "react"
import DesktopProductSkeleton from "./DesktopSkeleton"
import MobileProductSkeleton from "./MobileProductSkeleton"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ProductSkeleton = props => {

    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    return (
        <div>
            {!matches ? <DesktopProductSkeleton/> : <MobileProductSkeleton />}
        </div>
    )
}

export default ProductSkeleton