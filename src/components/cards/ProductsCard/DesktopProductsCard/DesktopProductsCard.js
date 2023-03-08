import React, { useEffect, useState } from "react"
import "./DesktopProductsCard.scss"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Divider, Grow, makeStyles } from "@material-ui/core";
import ImageContainer from "../../ImageContainer/ImageContainer";
import ProductCounter from "../../../ProductCounter/ProductCounter";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import StyleIcon from '@material-ui/icons/Style';

import BaseModal from "../../../modal/base_modal";
import { useHistory } from "react-router-dom";

import ProductTypeModal from "../modals/ProductTypeModal/ProductTypeModal";

const useStyles = makeStyles({
    card: {
        borderRadius: "10px"
    },
    productName: {
        whiteSpace: "nowrap"
    },
    styleIcon: {
        color: "#ababab"
    }
})

const DesktopProductsCard = props => {
    const classes = useStyles()
    const [typeModal, setTypeModal] = useState(false)
    const history = useHistory()

    return (
        <Grow
            in={!props.loading}
            {...(!props.loading ? { timeout: (props.index + 1) * 1000 } : {})}
        >
            <div className="productsCardContainer" {...props}>

                <Card
                    className={classes.card}

                >
                    <ImageContainer
                        src={props.product.pic_url}
                        height={240}
                        width={240}
                        onClick={e => {
                            history.push("/product/" +
                                props.product.category.id + "/" + props.product.id)
                        }}
                    />
                    <CardContent style={{padding:'8px'}}>
                        <p className="desktopProductName">
                            {props.product.name}
                        </p>
                    </CardContent>

                    {(props.product.off_percent ?

                        <div className="discountCountainer">
                            <p className="discountTitle">{props.product.off_percent}% <br />تخفیف</p>
                        </div>
                        : null)}
                    <div className="desktopProductCardTypeContainer">
                        <div className="desktopProductPlusContainer">
                        {
                            console.log(props.product)
                        }
                            {!(props.product.off_percent && props.product.off_percent !== 0) ?
                                
                                <Typography variant="h5" color="textSecondary">
                                    {props.product.types[0].price}تومان
                                </Typography>
                                : null
                            }
                        </div>
                        {false ?
                            null
                            :
                            props.product.types.length === 1 ?
                                <ProductCounter
                                    plusOnly
                                    item={props.product.types[0]}
                                    product={props.product}
                                />
                                :
                                <div className="desktopProductPlusContainer">
                                    <BaseModal open={typeModal} setOpen={setTypeModal}>
                                        <ProductTypeModal open={typeModal} setOpen={setTypeModal} product={props.product} />
                                    </BaseModal>
                                    <StyleIcon className={classes.styleIcon} />
                                    <IconButton
                                        onClick={(e) => {
                                            setTypeModal(true)
                                        }}
                                    >
                                        <AddIcon color="secondary" />
                                    </IconButton>
                                </div>
                        }

                    </div>

                </Card>
            </div>
        </Grow>
    )

}



export default DesktopProductsCard