import React from "react"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CommentIcon from '@material-ui/icons/Comment';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AppBarLogo from "../Desktop/logo.png"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import store from "../../../redux/store"

export const getDrawerItems = () => {
    return (
        [
            {
                icon: <PersonOutlineIcon color="secondary" fontSize="large" className="drawerIcons"/>,
                text: "پروفایل",
                link: "/profile/profileInfo",
                content:{ title: "اطلاعات پروفایل", profileContentValue: "profileInfo" },
                show:store.getState().user.login
            },
            // {
            //     icon: <ListAltIcon color="secondary" fontSize="large" className="drawerIcons"/>,
            //     text: "لیست سفارش ها",
            //     link: "/profile/buyHistory",
            //     content:{ title: "سوابق خرید", profileContentValue: "buyHistory" },
            //     show:store.getState().user.login
            // },
            {
                icon: <LocationOnIcon color="secondary" fontSize="large" className="drawerIcons"/>,
                text: "آدرس ها",
                link: "/profile/profileAddress",
                content:{ title: "آدرس ها", profileContentValue: "profileAddress" },
                show:store.getState().user.login
            },

            {
                icon: <AccountBalanceIcon color="secondary" fontSize="large" className="drawerIcons"/>,
                text: "ارتباط با ما",
                link: "/contactus",
                show:true
            },
            {
                icon: <img src={AppBarLogo} className="drawerIcons"/>,
                text: "درباره ما",
                link: "/aboutus",
                show:true
            },
            {
                icon: <ExitToAppIcon color="secondary" fontSize="large" className="drawerIcons"/>,
                text: "خروج از حساب کاربری",
                link: "https://www.bastanitarasht.ir",
                content:"exit",
                show:store.getState().user.login
            }            
        ]
    )
}