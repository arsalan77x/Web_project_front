import React, { useEffect, useState } from "react"
import "./AboutUs.scss"
import aboutUsImage from "./aboutUsImage.png"
import APP_URL from "../../Data/APP_URL"
import useMediaQuery from '@material-ui/core/useMediaQuery';


const AboutUs = props => {

    const [aboutUs, setAboutUs] = useState({})
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))


    const aboutusContent =
        <div className="aboutUsContainer">
            <img className="aboutUsImage" src={aboutUsImage} />
            <div className="aboutUsDetailsContainer">
                <p className="aboutUsTitle">درباره ما</p>
                <p className="aboutUsDetails">لبنیات سنتی و آبمیوه بستنی طرشت (لبنیاتی) در محله تیموری تهران و خیابان شالیزار واقع شده است و از نظر موقعیت جغرافیایی در نزدیکی مرکز خرید شریف و همچنین لبنیات طرشت، ایرانیان سرویس مرکزی، دیزی عموعباس، دانشکده مدیریت و اقتصاد دانشگاه شریف و هفت میوه قرار گرفته است با توجه به نزدیکی این فروشگاه به ایستگاه مترو دانشگاه شريف، برای دسترسی راحت‌تر و کمک به داشتن هوایی پاک‌تر، می‌توانید از وسایل حمل و نقل عمومی برای مراجعه به آن استفاده کنید.</p>
            </div>
        </div>

    return (
        <div>
            {!matches ?
                aboutusContent :
                <div>
                    <img src={APP_URL + "/images/slider/slide.jpg"} width="100%" />
         
                    {aboutusContent}
                </div>
            }

        </div>
    )
}

export default AboutUs