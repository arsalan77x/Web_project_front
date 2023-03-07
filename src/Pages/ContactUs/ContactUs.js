import React from "react"
import AppBar from "../../components/AppBar/AppBar"
import ContactUsComponent from "../../components/ContactUs/ContactUs"
import Footer from "../../components/Footer/Footer"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"

class ContactUs extends React.Component {

    render() {
        return (
            <div>
                <ContentWrapper>
                    <ContactUsComponent />
                </ContentWrapper>
                <Footer />
            </div>
        )
    }
}

export default ContactUs