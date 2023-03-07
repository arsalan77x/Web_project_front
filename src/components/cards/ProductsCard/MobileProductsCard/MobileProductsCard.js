import React, { useEffect } from "react"
import "./MobileProductsCard.scss"
import Card from '@material-ui/core/Card';
import APP_URL from "../../../../Data/APP_URL"
import MobileProductCardItem from "./MobileProductCardItem/MobileProductCardItem";
import { Grow } from "@material-ui/core";
import ImageContainer from "../../ImageContainer/ImageContainer";
import { useHistory } from "react-router-dom";

const MobileProductsCard = props => {
    const history = useHistory()
    return (
        <Grow in={!props.loading}
            {...(!props.loading ? { timeout: (props.index + 1) * 1000 } : {})}
        >
            <div className="mobileProductCardContainer" {...props}>

                <Card className="mobileProductCard" >

                    <ImageContainer
                        src={props.product.pic_url}
                        height={130}
                        width={130}
                        onClick={e => history.push("/product/" +
                        props.product.category.id + "/" + props.product.id)} />

                    <div className="mobileProductDetailContainer">
                        <p className="mobileProductName">{props.product.name}</p>
                        <MobileProductCardItem
                            product={props.product} />
                    </div>



                </Card>
                {(props.product.off_percent ?
                    <div className={(props.type === "dailyOffer") ? "mobileDiscountCountainerTop" : "mobileDiscountCountainerRight"}>

                        <p className="mobileDiscountTitle">{props.product.off_percent}% <br />تخفیف</p>
                    </div>
                    : null)}
            </div>
        </Grow>

    )
}

export default MobileProductsCard