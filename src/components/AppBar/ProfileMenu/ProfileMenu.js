import React, { useEffect, useState, useRef } from 'react';
import "./ProfileMenu.css"
import MenuItem from '@material-ui/core/MenuItem';
import userProfileIcon from "./userProfile.png"
import listIcon from "./list.png"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import exitIcon from "./exit.png"
import { exitAccount } from '../ProfileMenuApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProfileMenu = props => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const handleClose = (event) => {
        if (props.anchorRef.current && props.anchorRef.current.contains(event.target)) {
            return;
        }

        props.setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            props.setOpen(false);
        }
    }

    const prevOpen = useRef(props.open);
    useEffect(() => {
        if (prevOpen.current === true && props.open === false) {
            props.anchorRef.current.focus();
        }

        prevOpen.current = props.open;
    }, [props.open]);

    return (
        <Popper open={props.open} anchorEl={props.anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <Link to="/profile/profileInfo">
                                    <MenuItem divider={true} onClick={(e) => { props.setOpen(false) }}>
                                        <div className="menuListItemContainer">
                                            <img src={userProfileIcon} className="userProfileImage" />
                                            <div>
                                                <p className="userNameTitle">{user.name}</p>
                                                <div className="menuListItemContainer">
                                                    <p className="seeProfileText">مشاهده حساب کاربری</p>
                                                    <ArrowBackIosIcon fontSize="small" />
                                                </div>
                                            </div>
                                        </div>
                                    </MenuItem>
                                </Link>
                                <Link to="/profile/buyHistory">
                                    <MenuItem divider={true} onClick={(e) => { props.setOpen(false) }}>
                                        <div className="menuListItem">
                                            <img src={listIcon} className="listItemIcon" />
                                            <p className="listItemText">سفارش های من</p>
                                        </div>
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={() => { exitAccount(); props.setOpen(false); history.push("/")}}>
                                    <div className="menuListItem">
                                        <img src={exitIcon} className="listItemIcon" />
                                        <p className="listItemText">خروج از حساب کاربری</p>
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default ProfileMenu