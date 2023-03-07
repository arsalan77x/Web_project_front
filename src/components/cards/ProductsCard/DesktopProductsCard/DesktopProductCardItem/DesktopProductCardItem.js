import React from "react"
import "./DesktopProductCardItem.scss"

import ProductCounter from "../../../../ProductCounter/ProductCounter";

const DesktopProductCardItem = props => {

    const listItems = props.types.map(item =>

        <div className="ProductsDetailsContainer" key={item._id}>
            {item.size && <p className="ProductSize">{item.size}</p>}
            <div className="productPriceContainer">
                {(props.discount ?
                    <del className="deletedPrice"> {item.price.toLocaleString()} تومان</del>
                    : null)}
                <p className="price">  تومان</p>
            </div>

            <ProductCounter
                plusOnly
                item={item}
                product={props.product}
            />

        </div>
    )
    return (
        <div>
            {listItems}
        </div>
    )
}

export default DesktopProductCardItem