import React, { useEffect } from "react"
import { Box, Button, Divider, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import BasketItem from "../../components/cards/BasketItem/BasketItem"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setError } from "../../redux/error_slice";

const MobileBasket = props => {
    const bottomHeight = 200

    const useStyles = makeStyles({
        bottomDetail: {
            position: 'fixed', bottom: 0, left: 0, right: 0,
            backgroundColor: 'white',
            height: bottomHeight,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0px',
            padding: '8px 10px',
            boxSizing: 'border-box'
        },
        listContainer: {
            padding: '0px 10px'
        },
        basketContainer: {
            paddingBottom: bottomHeight
        },
        basketHeader: {
            position: 'sticky',
            top: 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            backgroundColor: '#f1f1f1',
            zIndex: 1,
            borderRadius: 0,
            marginBottom: 16,
            padding: '4px 0px'
        },
        row: {
            display: "flex",
            justifyContent: 'space-between',
            marginBottom: '8px'
        }
    })
    const classes = useStyles()
    const prices = useSelector(state => state.prices)
    const basket = useSelector(state => state.basket)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    async function gotoAddress() {
        if (user.login) {
            var field = document.getElementById("orderCaptionField")
            sessionStorage.setItem("orderCaption", field ? field.value : "")
            history.push("/addresses")
        } else {
            const label = "لطفا وارد حساب کاربری خود شوید"
            dispatch(setError({ open: true, message: label, state: "warning" }))
        }
    }
    return (
        <div className={classes.basketContainer}>
            <Paper className={classes.basketHeader} elevation={1}>
                <Typography variant="h5">سبد خرید</Typography>
            </Paper>
            <Box className={classes.listContainer}>
                <Typography>توضیحات</Typography>
                <TextField
                    id="orderCaptionField"
                    placeholder="توضیحات خود را اینجا وارد کنید"
                    fullWidth
                    style={{ marginBottom: '10px' }} />
                {basket.map(item => <BasketItem key={item._id} usage="mobile" item={item} />)}
            </Box>

            <Paper elevation={1} className={classes.bottomDetail}>
                <Box className={classes.row}>
                    <Typography color="textSecondary">قیمت کالا ها:</Typography>
                    <Typography>{prices.products_without_off} تومان</Typography>
                </Box>
                <Box className={classes.row}>
                    <Typography color="textSecondary">قیمت بسته بندی</Typography>
                    <Typography>{prices.pack} تومان</Typography>
                </Box>
                <Box className={classes.row}>
                    <Typography color="textSecondary">تخفیف:</Typography>
                    <Typography color="secondary">{prices.off} تومان</Typography>
                </Box>
                <Box className={classes.row}>
                    <Typography color="textSecondary"> جمع: </Typography>
                    <Typography>{prices.products_with_off} تومان</Typography>
                </Box>
                <Divider />
                <Box className={classes.row} marginTop={"10px"}>
                    <Button color="secondary" variant="contained" style={{ padding: '4px 30px', fontSize: '1.2rem' }}
                        onClick={gotoAddress}>
                        ادامه
                    </Button>
                    <Box marginTop={'-10px'} textAlign={'center'}>
                        <Typography color="textSecondary" variant="caption" style={{ margin: 0 }}> جمع کل: </Typography>
                        <Typography variant="h5" style={{ lineHeight: '16px' }}>{prices.products_with_off} تومان</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}

export default MobileBasket