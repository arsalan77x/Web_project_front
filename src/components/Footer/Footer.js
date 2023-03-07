import React from "react"
import DesktopFooter from "./Dedktop/DesktopFooter"
import MobileFooter from "./Mobile/MobileFooter"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Footer = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    return (
        <div>
            {!matches ? <DesktopFooter color={props.color}/> : <MobileFooter/>}
           
        </div>
    )
}

export default Footer