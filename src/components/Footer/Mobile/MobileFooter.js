import React, { useEffect, useState } from "react"
import "./MobileFooter.scss"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../../redux/error_slice";

const useStyles = makeStyles((theme) => ({
    shoppingCartIcon: {
        color: "white",
        marginLeft: "10px"
    }
}));

const MobileFooter = props => {
    const basketLength = useSelector(state => state.basket?.length)

    return (
        <Fade in={(basketLength > 0) ? true : false}>
            <Content basketLength={basketLength}/>
        </Fade>
    )
}

function Content(props) {
    const user = useSelector(state => state.user)
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div {...props}>
            <Box onClick={() => {
                if (user.login) {
                    history.push("/basket")
                } else {
                    const label = "لطفا وارد حساب کاربری خود شوید"
                    dispatch(setError({ open: true, message: label, state: "warning" }))
                }
            }}>
                <div className="mobileFooterContainer">
                    <ShoppingCartIcon className={classes.shoppingCartIcon} fontSize="large" />
                    <p className="mobileFooterText"> مشاهده سبد خرید </p>
                    <p className="mobileFooterText">( {props.basketLength} )</p>
                </div>
            </Box>
        </div>
    )
}

export default MobileFooter