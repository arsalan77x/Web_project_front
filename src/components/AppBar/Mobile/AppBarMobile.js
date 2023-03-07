import React, { Fragment, useState, useRef } from 'react';
import "./AppBarMobile.scss"
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { getDrawerItems } from './DrawerItems';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { exitAccount } from '../ProfileMenuApi';
import UserImage from "../user.png"
import downImage from "../down.png"
import { Divider } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import tarashtImage from "./tarasht.png"
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    listItem: {
        textAlign: 'right',
        color: "black"
    },
    paper: {
        width: "70%"
    },
}));

const AppBarMobile = props => {
    const basketLength = useSelector(state => state.basket?.length)
    const user = useSelector(state => state.user)
    const classes = useStyles()
    const [isDrawerOpen, setDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const history = useHistory()

    const toggleDrawer = () => {
        setDrawer(!isDrawerOpen)
    }

    const profileToggle = (e) => {
        setOpen((prevOpen) => !prevOpen);
    }

    const goToPage = (content) => {

        if (content === "exit") {
            exitAccount()
        }

        toggleDrawer()
    }
    const listItem = getDrawerItems().map(item =>
        item.show ? (

            <Link to={item.link} key={item.link}>
                <ListItem className={classes.listItem} button divider onClick={() => {
                    goToPage(item.content)
                }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primaryTypographyProps={classes.listItem}>{item.text}</ListItemText>
                </ListItem>
            </Link>

        ) : null
    )

    const appBarProfile =
        <div className="appBarProfileContainer">
            <div className="appBarProfileButton" onClick={profileToggle} ref={anchorRef}>
                <img src={UserImage} className="appBarUserImage" />
                <img src={downImage} className="appBarDownImage" />
            </div>
            <ProfileMenu open={open} setOpen={setOpen} anchorRef={anchorRef} />
            <Divider orientation="vertical" />
            <IconButton>
                <Badge badgeContent={basketLength} color="secondary" onClick={e => {
                    window.location.href = "/basket"
                }}>
                    <ShoppingBasketIcon />
                </Badge>
            </IconButton>
        </div>
    return (
        <div className="appBarMobileContainer">
            <IconButton className="menuIcon" onClick={toggleDrawer}>
                <MenuIcon color="secondary" fontSize="large" />
            </IconButton>
            {user.login ? appBarProfile :
                <IconButton className="loginButton" onClick={() => props.setOpen(true)}>
                    <PersonAddIcon color="secondary" fontSize="large" />
                </IconButton>}

            <Fragment style={{ backgroundColor: "black" }}>
                <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} classes={{ paper: classes.paper }}>
                    <div className="drawerContainer">
                        <div className="drawerAppBar">
                            <IconButton className="menuIcon" onClick={toggleDrawer}>
                                <KeyboardArrowRightIcon color="secondary" fontSize="large" />
                            </IconButton>
                        </div>
                        <img src={tarashtImage} className="drawerImage" onClick={e => history.push("/")} />
                        <List>
                            {listItem}
                        </List>
                    </div>
                </Drawer>
            </Fragment>
        </div>
    )
}

export default AppBarMobile


