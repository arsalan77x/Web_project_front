import React, { useEffect, useState } from "react"
import "./FinishShopping.scss"
import Divider from "@material-ui/core/Divider";
import Card from '@material-ui/core/Card';
import { buy, calculateBasketPrices } from "../../../Data/Utils";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Box, Checkbox, Container, makeStyles, Typography } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getSendPrice } from "../../../components/cards/AddressCard/AddressCardApi";
import { useSelector, useDispatch } from "react-redux";
import { setPrices } from "../../../redux/prices_slice";
import { setError } from "../../../redux/error_slice";

const useStyles = makeStyles(theme => ({
    container: {
        background: "#b8ffaf",
        borderRadius: '10px',
        padding: '0px 3px',
        width: 'auto',
        marginBottom: '5px',
        alignItems: 'center'
    },
    radioGroup: {
        margin: '0px auto'
    },
    formControlLabel: {
        margin: '0px'
    },
    checkIcon: {
        color: "green",
    }
}))

const FinishShopping = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const basketLength = useSelector(state => state.basket?.length)
    const prices = useSelector(state => state.prices)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [deliveryType, setDeliveryType] = useState("home")
    const [payType, setPayType] = useState("online")
    const history = useHistory()
    const handleChangeDelivery = async (event) => {
        setDeliveryType(event.target.value);
        if (event.target.value == "shop") {
            dispatch(setPrices({ shop_deliver: true }))
            calculateBasketPrices(undefined, true)
        } else {
            if (user.order?.address?._id) {
                let price = await getSendPrice(user.order.address)
                console.log(price)
                dispatch(setPrices({ send: price, shop_deliver: false }))
                calculateBasketPrices(price, false)
            } else {
                dispatch(setPrices({ shop_deliver: false }))
                calculateBasketPrices(undefined, false)
            }
        }
    };

    useEffect(() => {
        dispatch(setPrices({ shop_deliver: false }))
        calculateBasketPrices(undefined, false)
    }, [])

    const handlePayType = event => {
        setPayType(event.target.value)
    }

    return (
        <div className="finishShoppingContainer">
            <div className="priceDetailsContainer"
                elevation={5}>
                <div className="productsPriceContainer">
                    <p className="priceTitle">???????? ???????? ????:</p>
                    <p className="priceText">{prices.products_without_off} ??????????</p>
                </div>
                <div className="productsPriceContainer">
                    <p className="priceTitle">???????? ???????? ????????</p>
                    <p className="priceText">{prices.pack} ??????????</p>
                </div>
                <div className="productsPriceContainer">
                    <p className="priceTitle">?????????? ??????????</p>
                    <p className="priceText">{deliveryType == "shop" ? "????????????" : (prices.send ?? "????????????")} </p>
                </div>
                <div className="discountContainer">
                    <p className="payDiscountTitle">??????????:</p>
                    <p className="discount">{prices.off} ??????????</p>
                </div>
                <div className="totalContainer">
                    <p className="payTotalPriceTitle"> ??????: </p>
                    <p className="payTotalPrice">{prices.products_with_off} ??????????</p>
                </div>

                <Divider />

                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                        <Typography variant="h6" color="textSecondary">?????? ??????????:</Typography>
                        <RadioGroup className={classes.radioGroup} value={deliveryType} onChange={handleChangeDelivery}>
                            <FormControlLabel className={classes.formControlLabel} value="home" control={<Radio />} label="?????????? ?????? ????????" />
                            <FormControlLabel className={classes.formControlLabel} value="shop" control={<Radio />} label="?????????? ???? ??????" />
                        </RadioGroup>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box>
                        <Typography variant="h6" color="textSecondary">?????? ????????????:</Typography>
                        <RadioGroup className={classes.radioGroup} value={payType} onChange={handlePayType}>
                            <FormControlLabel className={classes.formControlLabel} value="online" control={<Radio />} label="???????????? ????????????" />
                            <FormControlLabel className={classes.formControlLabel} value="offline" control={<Radio />} label="???????????? ??????????" />
                        </RadioGroup>
                    </Box>
                </Box>

                <Divider />

                <div className="mobileButtonContainer">
                    <Typography className="payButtonMobile" onClick={e => {
                        if (user.login) {
                            history.push("/addresses")
                        } else {
                            const label = "???????? ???????? ???????? ???????????? ?????? ????????"
                            dispatch(setError({ open: true, message: label, state: "warning" }))
                        }
                    }}>
                        ??????????
                    </Typography>
                    <div className="payBuyablePriceContainer">
                        <p className="payBuyablePriceTitle">???????? ???????? ????????????</p>
                        <p className="payBuyablePrice">{prices.total} ??????????</p>
                    </div>
                </div>

                <p className="payButton" onClick={e => buy(basketLength, props.addresses, deliveryType, payType, history)}>????????????</p>
            </div>




        </div>
    )
}

export default FinishShopping