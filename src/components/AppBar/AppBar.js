import React, { useEffect, useState } from 'react';
import "./AppBar.css"
import AppBarMobile from "./Mobile/AppBarMobile"
import AppBarDesktop from './Desktop/AppBarDesktop';
import BaseModal from '../modal/base_modal';
import AuthModal from './modals/auth_modal';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { setPrices } from '../../redux/prices_slice';
import { calculateBasketPrices } from '../../Data/Utils';

const AppBar = props => {

    const basket = useSelector(state => state.basket)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    
    useEffect(()=> {
        calculateBasketPrices()
    }, [basket])

    return (

        <div className="appBarContainer">
            {!matches ?
                <AppBarDesktop setOpen={setOpen} /> :
                <AppBarMobile setOpen={setOpen} />}
            <BaseModal open={open} setOpen={setOpen}>
                <AuthModal open={open} setOpen={setOpen} />
            </BaseModal>
        </div>
    )
}

export default AppBar


