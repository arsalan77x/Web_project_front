import React, { useEffect, useState } from "react"
import { makeStyles, InputBase, Button, Box, Paper } from "@material-ui/core"
import { buy, calculateBasketPrices, getUserAddresses } from "../../Data/Utils";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Typography, Container } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import BaseModal from "../../components/modal/base_modal"
import AddAddressModal from "../../components/AddAddressModal/AddAddressModal"
import AddressCard from "../../components/cards/AddressCard/AddressCard"
import { getSendPrice } from "../../components/cards/AddressCard/AddressCardApi"
import { useSelector, useDispatch } from "react-redux";
import { setPrices } from "../../redux/prices_slice"
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const bottomHeight = 235
const MobileAddress = props => {

    const basketLength = useSelector(state => state.basket?.length)
    const history = useHistory()
    const prices = useSelector(state => state.prices)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [deliveryType, setDeliveryType] = useState("home")
    const [payType, setPayType] = useState("online")
    const [addresses, setAddresses] = useState([])
    const [open, setOpen] = useState(false)

    const handleChangeDelivery = async (event) => {
        setDeliveryType(event.target.value);
        if (event.target.value == "shop") {
            dispatch(setPrices({ shop_deliver: true }))
            calculateBasketPrices(undefined, true)
        } else {
            if (user.order?.address?._id) {
                let price = await getSendPrice(user.order.address)
                dispatch(setPrices({ send: price, shop_deliver: false }))
                calculateBasketPrices(price, false)
            } else {
                dispatch(setPrices({ shop_deliver: false }))
                calculateBasketPrices(undefined, false)
            }
        }
    };

    const handlePayType = event => {
        setPayType(event.target.value)
    }
    useEffect(() => {
        dispatch(setPrices({ shop_deliver: false }))
        calculateBasketPrices(undefined, false)
        getUserAddresses(setAddresses)
    }, [])

    return (
        <Box className={classes.basketContainer}>
            <BaseModal open={open} setOpen={setOpen}>
                <AddAddressModal open={open} setOpen={setOpen} addresses={addresses} setAddresses={setAddresses} />
            </BaseModal>
            <Paper elevation={1} className={classes.addressHeader}>
                <Typography variant="h5">انتخاب آدرس</Typography>
                <Button color="secondary" variant="outlined"
                    style={{ fontSize: '1.2rem', paddingRight: '0px' }}
                    startIcon={<AddIcon style={{ marginLeft: '5px' }} />}
                    onClick={e => setOpen(true)}>
                    آدرس جدید
                </Button>

            </Paper>
            <Box padding={'10px'}>
            {addresses.map(item => <AddressCard key={item._id} item={item} usage="pay" />)}
            </Box>
            <Box className={classes.bottomDetail}>
                <Box display={'flex'} justifyContent={'space-between'} margin={"5px 0px"} alignItems={'center'}>
                    <Typography color="textSecondary">هزینه ارسال</Typography>
                    <Typography variant="h6">{deliveryType == "shop" ? "رایگان" : "رایگان" } </Typography>
                </Box>
                <Divider />

                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                        <Typography variant="h6" color="textSecondary">نوع تحویل:</Typography>
                        <RadioGroup className={classes.radioGroup} value={deliveryType} onChange={handleChangeDelivery}>
                            <FormControlLabel className={classes.formControlLabel} value="home" control={<Radio />} label="تحویل درب منزل" />
                            <FormControlLabel className={classes.formControlLabel} value="shop" control={<Radio />} label="تحویل در محل" />
                        </RadioGroup>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box>
                        <Typography variant="h6" color="textSecondary">نوع پرداخت:</Typography>
                        <RadioGroup className={classes.radioGroup} value={payType} onChange={handlePayType}>
                            <FormControlLabel className={classes.formControlLabel} value="online" control={<Radio />} label="پرداخت آنلاین" />
                            <FormControlLabel className={classes.formControlLabel} value="offline" control={<Radio />} label="پرداخت حضوری" />
                        </RadioGroup>
                    </Box>

                </Box>
                <Divider />
                <Box display={'flex'} justifyContent={'space-between'} marginTop={'8px'} alignItems={'center'}>
                    <Button color="secondary" variant="contained" style={{ fontSize: '1.2rem', padding:'5px 20px' }}
                        onClick={e => buy(basketLength, addresses, deliveryType, payType, history)}>پرداخت</Button>
                    <Box textAlign={'center'}>
                        <Typography color="textSecondary" variant="body2">قابل پرداخت</Typography>
                        <Typography variant="h5" style={{ lineHeight: "20px" }}>{prices?.total} تومان</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    basketContainer: {
        paddingBottom: bottomHeight
    },
    bottomDetail: {
        position: 'fixed', bottom: 0, left: 0, right: 0,
        boxShadow: '0px -2px 5px #c7c7c7',
        backgroundColor: 'white',
        height: bottomHeight,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0px',
        padding: '8px 10px',
        boxSizing: 'border-box'
    },
    container: {
        background: "#b8ffaf",
        borderRadius: '10px',
        padding: '0px 3px',
        width: 'auto',
        marginBottom: '5px',
        alignItems: 'center'
    },
    checkIcon: {
        color: "green"
    },
    checkbox: {
        marginRight: "auto"
    },
    radioGroup: {
        margin: '0px auto'
    },
    formControlLabel: {
        margin: '0px'
    }, caption: {
        width: '100%',
        fontSize: '16px',
        borderRadius: '0px',
        padding: '10px',
        border: '1px solid #c7c7c7'
    },
    addressHeader: {
        position: 'sticky',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        top: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
        zIndex: 1,
        borderRadius: 0,
    },
})


export default MobileAddress