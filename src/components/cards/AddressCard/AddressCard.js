import React from "react"
import { Box, Checkbox, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import { getSendPrice } from "./AddressCardApi";
import { useDispatch, useSelector } from "react-redux";
import { setPrices } from "../../../redux/prices_slice";
import { setUser } from "../../../redux/user_slice";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { calculateBasketPrices } from "../../../Data/Utils";
const AddressCard = props => {

    const dispatch = useDispatch()
    const prices = useSelector(state => state.prices)
    const user = useSelector(state => state.user)
    const classes = useStyles({selected: props.usage === "pay" && (user.order?.address?._id === props.item._id) ? true : false})

    const chooseAddress = async (item) => {
        dispatch(setUser({ order: { address: item } }))
        let price = await getSendPrice(item)
        dispatch(setPrices({ ...prices, send: price }))
        calculateBasketPrices(price)
    }

    return (
        <Paper className={classes.addressCard}
        elevation={0}
            onClick={e => props.usage === "pay" ? chooseAddress(props.item) : null}>
            {props.usage === "pay" ?
                <Checkbox color="" checkedIcon={<CheckCircleIcon className={classes.checkIcon} />}
                    icon={<FiberManualRecordIcon className={classes.uncheckIcon} />}
                    checked={(user.order?.address?._id === props.item._id) ? true : false} />
                : null
            }
            <Typography >{props.item.title} ، {props.item.detail}</Typography>
            <IconButton style={{marginRight: 'auto'}}>
                <MoreVertIcon />
            </IconButton>
        </Paper>
    )
}

const useStyles = makeStyles({
    addressCard: {
        border: props => props.selected ? 'solid 1px #17bf2a': 'solid 1px #c7c7c7',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        marginBottom: '8px',
        width: '100%',
        boxSizing: 'border-box'
    },
    checkIcon: {
        color: "#17bf2a",
        fontSize: '30px'
    },
    uncheckIcon: {
        color: "#f1f1f1",
        fontSize: '30px'
    },
})

export default AddressCard