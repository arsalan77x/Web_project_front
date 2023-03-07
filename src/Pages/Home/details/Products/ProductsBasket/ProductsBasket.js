import React, { useEffect } from "react"
import "./ProductsBasket.scss"
import BasketItem from "../../../../../components/cards/BasketItem/BasketItem";
import { Badge, Card, InputBase, makeStyles, TextField, Typography } from "@material-ui/core";
import { goToPayPage } from "../../../../../Data/Utils";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles(theme => ({
    caption: {
        width: '100%',
        fontSize: '14px',
        borderRadius: '0px',
        padding: '10px'
    }
}))

const ProductsBasket = props => {
    const basket = useSelector(state => state.basket)
    const prices = useSelector(state => state.prices)
    const classes = useStyles()
    const history = useHistory()

    return (
        <div className="productsBasketContainer">
            <div className="basketHeader">
                <Badge badgeContent={basket?.length} color="secondary">
                    <ShoppingCartIcon fontSize="large" />
                </Badge>
                <Typography variant="h5">سبد خرید </Typography>
            </div>

            <div className="basketContainer">
                <div className="basketSticky">
                    {basket?.map(item => <BasketItem key={item._id} item={item} />)}
                </div>

                <div className="totalPriceContainer">
                    <p className="totalPriceTitle">جمع کل:</p>
                    <p className="totalPrice">{prices?.products_with_off?.toLocaleString()} تومان</p>
                </div>

            

                <Typography className="basketButton" onClick={(e) => goToPayPage(basket?.length, history)}>
                    تکمیل سفارش
                </Typography>

            </div>
        </div>
    )
}

export default ProductsBasket