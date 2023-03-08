import React, { useEffect, useState } from "react"
import "./DesktopProfile.scss"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import BuyHistoryCard from "../BuyHistoryCard/BuyHistoryCard"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import ProfileAddress from "../ProfileAddress/ProfileAddress"
import { Avatar, Box } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        float: "right",
        marginLeft: "10px",
        marginBottom: "10px"
    },
    listItem: {
        textAlign: 'right'
    },
    menu: {
        width: '25%',
        float: 'right',
        padding: '5px',
        position:'sticky',
        top: '90px'
    }
}));
const menuWidth = 300
const DesktopProfile = (probs) => {
    const classes = useStyles()
    const user = useSelector(state => state.user)

    const profileListData =
        [
            {
                icon: <PersonOutlineIcon />,
                text: "پروفایل",
                link: "/profile",
                content: { title: "اطلاعات پروفایل", profileContentValue: "profileInfo" }
            },
            // {
            //     icon: <FeaturedPlayListIcon />,
            //     text: "سوابق خرید",
            //     link: "/profile",
            //     content: { title: "سوابق خرید", profileContentValue: "buyHistory" }
            // },
            {
                icon: <ContactMailIcon />,
                text: "آدرس ها",
                link: "/profile",
                content: { title: "آدرس ها", profileContentValue: "profileAddress" }
            }
        ]
    const profileListItem = profileListData.map((item, index) =>
        <Link key={item.text} to={"/profile/" + item.content.profileContentValue} className="desktopProfileLink">
            <ListItem className={classes.listItem} button divider={index != profileListData.length - 1}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={classes.listItem}>{item.text}</ListItemText>
            </ListItem>
        </Link>
    )

    return (
        <Box width={"80%"} margin={'0px auto'} textAlign={'center'} >
            <Card
                className={classes.menu}
                elevation={3}>
                <Avatar className={classes.large}>
                    <AccountCircle fontSize="large" />
                </Avatar>
                <Box className="customerInfoContainer">
                    <p className="profileName">{user.name}</p>
                    <p className="profileNumber">{user.phone}</p>
                </Box>
                <List>
                    {profileListItem}
                </List>
            </Card>


            <Box width={"60%"} marginRight={"50px"} display={'inline-block'} paddingTop={'20px'}>
                <Switch>
                    <Route path="/profile/buyHistory" component={BuyHistoryCard} />
                    <Route path="/profile/profileInfo" component={ProfileInfo} />
                    <Route path="/profile/profileAddress" component={ProfileAddress} />
                </Switch>
            </Box>

        </Box>
    )
}

export default DesktopProfile