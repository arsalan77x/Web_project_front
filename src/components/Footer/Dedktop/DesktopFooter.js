import React from "react"
import "./DesktopFooter.scss"
import aparatIcon from "./aparat.png"
import instagramIcon from "./footerInstagram.png"
import telegramIcon from "./telegram.png"
import { Box, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const DesktopFooter = props => {
    const history = useHistory()
    const footerLinkItems = [
        {
            title: "صفحه اصلی",
            link: "/"
        },

        {
            title: "درباره ما",
            link: "/aboutus"
        },

        {
            title: "ارتباط با ما",
            link: "/contactus"
        }


    ]
    return (
        <Box className="footerContainer">
            {footerLinkItems.map(item =>
                <Typography key={item.title} className="footerLink" style={{marginRight:'30px'}} onClick={e => history.push(item.link)}>{item.title}</Typography>)}
            {[aparatIcon, instagramIcon, telegramIcon]
                .map((item, index) =>
                    <div key={item} className="footerIcon" style={{marginRight: index===0 ? 'auto' : '0px'}}>
                        <img src={item} />
                    </div>
                )}
            <div className={"footerCirclePay"} ></div>
        </Box>
    )
}

export default DesktopFooter