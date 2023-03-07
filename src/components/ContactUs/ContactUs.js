import React, { useState } from "react"
import "./ContactUs.scss"
import addressIcon from "./address.png"
import clockIcon from "./clock.png"
import phoneIcon from "./tell.png"
import instagramIcon from "./instagram.png"

import APP_URL from "../../Data/APP_URL"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ContactUs = props => {

    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const [contactusInfo, setContactusInfo] = useState({
        phone: "02166518417",
        address: "تهران،شریف،خ. تیموری",
        telegram: "",
        instagram: "",
        id: ""
    })

    const contactUsListItem = [{ text: "همه روزه از ساعت 11:00 الی 23:00", image: clockIcon },
    { text: contactusInfo.address, image: addressIcon },
    { text: contactusInfo.phone, image: phoneIcon },
    { text: contactusInfo.instagram, image: instagramIcon }]
        .map(item =>
            <div className="contactUsListItmeContainer" key={item.image}>
                <img className="contactUsListItemImage" src={item.image} />
                <p className="contactUsListItemText">{item.text}</p>
            </div>)

    const contactusContent = <div className="contactUsContainer">
        <div className="contactUsDetailsContainer">
            <p className="contactUsTitle">ارتباط با ما</p>
            {contactUsListItem}
        </div>

    </div>
    return (
        <div>
            {!matches ? contactusContent :
                <div>
                    <img src={APP_URL + "/images/slider/slide.jpg"} width="100%" />
                    {contactusContent}
                </div>
            }
        </div>
    )

}

export default ContactUs