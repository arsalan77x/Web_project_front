import React, { useEffect, useState, useRef } from 'react';
import "./AppBarDesktop.scss"
import { FillData } from "./FillData"
import logo from "./logo.png"
import login from "./login.png"
import UserImage from "../user.png"
import downImage from "../down.png"
import { Box, Divider, Typography } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { goToPayPage } from '../../../Data/Utils';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const AppBarDesktop = props => {
    const basketLength = useSelector(state => state.basket?.length)
    const user = useSelector(state => state.user)
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const history = useHistory()

    const handleToggle = (e) => {
        setOpen((prevOpen) => !prevOpen);
    };

    const buttonTitles = FillData()
        .map(item => <Typography className="appBarButton" key={item.title} onClick={e => history.push(item.link)}>{item.title}</Typography>)

    const appBarLogin =
        <Box className="appBarLogin" onClick={(e) => props.setOpen(true)}>
            <img src={login} width="20px" height="20px" style={{ float: "right" }} />
            <p style={{ float: "right", marginRight: "10px" }}>ورود / عضویت</p>
        </Box>

    const appBarProfile =
        <div className="appBarProfileContainer">
            <div className="appBarProfileButton" onClick={handleToggle} ref={anchorRef} >
                <img src={UserImage} className="appBarUserImage" />
                <img src={downImage} className="appBarDownImage" />
            </div>
            <ProfileMenu open={open} setOpen={setOpen} anchorRef={anchorRef} />
            <Divider orientation="vertical" />
            <IconButton onClick={e => goToPayPage(basketLength, history)}>
                <Badge badgeContent={basketLength} color="secondary">
                    <ShoppingBasketIcon />
                </Badge>
            </IconButton>
        </div>
    return (
        <div className="appBarDesktopContainer">
            <img src={logo} onClick={e => history.push("/")} className="appBarLogo" width="120px" height="60px" />
            {buttonTitles}
            {!user.login ? appBarLogin : appBarProfile}
        </div>
    )


}

export default AppBarDesktop


