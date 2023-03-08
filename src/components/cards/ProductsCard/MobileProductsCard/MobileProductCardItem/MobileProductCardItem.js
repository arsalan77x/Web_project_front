import React, { useState } from "react"

import "./MobileProductCardItem.scss"
import ProductCounter from "../../../../ProductCounter/ProductCounter";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import BaseModal from "../../../../modal/base_modal";


const MobileProductCardItem = props => {
    const listItems = props.product.types.map(item =>

        <div className="mobileProductCardItemContainer" key={item._id}>
            {item.size && <p className="mobileProductSize">{item.size}</p>}

            <div className="mobileProductPriceContainer">
                {(props.product.off_percent ?
                    <del className="mobileDeletedPrice"> {item.price.toLocaleString()}</del>
                    : null)}
                <p className="mobilePrice"> {item.price.toLocaleString()}</p>
            </div>

            {false ?
               null
                :
                <ProductCounter
                    product={props.product}
                    item={item}
                />
            }
        </div>
    )
    return (
        <div>
            {listItems}
        </div>
    )
}

export default MobileProductCardItem
