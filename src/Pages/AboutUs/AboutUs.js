import React from "react"
import AppBar from "../../components/AppBar/AppBar"
import AboutUsComponent from "../../components/AboutUs/AboutUs"
import Footer from "../../components/Footer/Footer"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"

class AboutUs extends React.Component {

    render() {
        return (
            <div>
                <ContentWrapper>
                    <AboutUsComponent />
                </ContentWrapper>
                <Footer />
            </div>
        )
    }
}

export default AboutUs