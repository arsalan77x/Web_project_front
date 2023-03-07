import React from "react"
import "./BasketItem.scss"
import ProductCounter from "../../../ProductCounter/ProductCounter";

const MobileBasketItem = props => {

    return (
        <div className="basketListItemContainer">
            <img src={props.item.imageUrl} className="mobileBasketItemImage" />
            <p className="basketProductDetail">{props.item.name}</p>
            <p className="basketProductDetail">{props.item.size}</p>
            <div className="basketListItemDetailsContainer">
                <ProductCounter
                    item={props.item.type}
                    product={props.item.product}
                />
                {props.discount && props.discount !== 0 &&
                    <del className="basketDeletedPrice">{props.item.price.toLocaleString()}</del>
                }
                <p className="basketPrice">{props.item.offPrice.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default MobileBasketItem