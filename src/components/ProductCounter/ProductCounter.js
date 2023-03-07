import React from "react"
import IconButton from '@material-ui/core/IconButton';
import "./ProductCounter.scss"
import { makeStyles, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/basket_slice";

const ProductCounter = React.memo(function MyProductCounter(props) {
    const useStyles = makeStyles(theme => ({
        icon: {
            color: props.gray ? "#9c9c9c" : "#f4006e"
        }
    }))
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className="productNumberContainer">
            {props.product.donthave ?
                <Typography color="textSecondary" style={{ marginLeft: '5px' }}>موجود نیست!</Typography>
                :
                <IconButton
                    onClick={(e) => {
                        dispatch(increment({ product: props.product, item: props.item }))
                    }}
                >
                    <AddIcon color="secondary" className={classes.icon} />
                </IconButton>
            }
            {!props.plusOnly && props.item.count !== 0 ?
                <p className="productNumber">{props.item.count}</p>
                : null}
            {!props.plusOnly && props.item.count !== 0 ?
                <IconButton onClick={(e) => {
                    dispatch(decrement({ item: props.item }))
                }}>
                    <RemoveIcon color="primary" className={classes.icon} />
                </IconButton>
                : null}


        </div>
    )
})

export default ProductCounter