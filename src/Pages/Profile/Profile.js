import React from "react"
import "./Profile.css"
import Footer from "../../components/Footer/Footer"
import DesktopProfile from "./DesktopProfile/DesktopProfile";
import MobileProfile from "./MobileProfile/MobileProfile";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Profile = (props) => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    return (
        <div>
            <ContentWrapper>
                {!matches ? <DesktopProfile /> : <MobileProfile />}
            </ContentWrapper>
            <Footer />
        </div>
    )
}

export default Profile