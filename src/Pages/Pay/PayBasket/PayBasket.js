import React, { useEffect } from "react"
import "./PayBasket.scss"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from "@material-ui/core"
import BasketItem from "../../../components/cards/BasketItem/BasketItem";
import { useSelector } from "react-redux";

const PayBasket = props => {
    const basket = useSelector(state => state.basket)
    return (
        <div className="payBasketContainer">
            <div className="payBasketTitleContainer">
                <Badge badgeContent={basket?.length} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
                <p className="payBasketTitle">سبد خرید </p>
            </div>
            <div className="payBasketItemsContainer">
                {basket.map(item => <BasketItem key={item._id} usage="mobile" item={item} />)}
            </div>
        </div>
    )
}

export default PayBasket