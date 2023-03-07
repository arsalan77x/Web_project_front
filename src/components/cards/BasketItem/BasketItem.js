import React, { useEffect } from "react"
import "./BasketItem.scss"
import "./DesktopBasketItem.scss"
import ProductCounter from "../../ProductCounter/ProductCounter";
import ImageContainer from "../ImageContainer/ImageContainer";

const BasketItem = props => {
    return (
        <div>
            {props.usage === "mobile" ?
                <div className="basketListItemContainer">
                    {/* <img src={props.item.imageUrl} className="mobileBasketItemImage" /> */}
                    <ImageContainer
                        src={props.item.imageUrl}
                        height={100}
                        width={100} />
                    <p className="basketProductDetail">{props.item.name + (props.item.size ? "(" + props.item.size + ")" : "")}</p>
                    <div className="basketListItemDetailsContainer">
                        <p className="basketPrice">{props.item.offPrice ? props.item.offPrice.toLocaleString() : ""}</p>

                        {props.item.discount && props.item.discount != 0 ?
                            <del className="basketDeletedPrice">{props.item.price.toLocaleString()}</del>
                            : null}

                        <ProductCounter
                            gray={true}
                            item={props.item.type}
                            product={props.item.product}/>
                    </div>
                </div>
                : <DesktopHomeBasketItem item={props.item} discount={props.item.discount} />}
        </div>

    )
}

function DesktopHomeBasketItem(props) {
    return (
        <div className="desktopBasketItemContainer">
            <p className="desktopBasketItemTitle">{props.item.name + (props.item.size ? "(" + props.item.size + ")" : "")}</p>
            <div className="desktopBasketVerticalColumn">
                <p className="basketPrice">{props.item.offPrice ? props.item.offPrice.toLocaleString() : ""}</p>

                {props.item.discount && props.item.discount != 0 ?
                    <del className="basketDeletedPrice">{props.item.price.toLocaleString()}</del>
                    : null}

                <ProductCounter
                    gray={true}
                    item={props.item.type}
                    product={props.item.product}
                />
            </div>
        </div>
    )
}

export default BasketItem