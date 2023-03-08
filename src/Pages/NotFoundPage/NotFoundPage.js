import { Button, Typography } from "@material-ui/core"
import React from "react"
import "./NotFoundPage.scss"
import logo from "../../components/AppBar/Desktop/logo.png"
import bg from "./bg404.png"
import image from "./image404.png"
import { useHistory } from "react-router-dom"

const NotFoundPage = props => {
    const history = useHistory()
    return (
        <div className="notFoundPageContainer">
            <img className="notFoundPageBack" src={bg} />
            <img className="notFoundPageLogo" src={logo} />
            <img className="notFoundPageImage" src={image} />
            <p className="notFoundPageText">صفحه مورد نظر یافت نشد!</p>
            <Typography className="notFoundPageButton" onClick={e => history.push("/")}>
                بازگشت به صفحه اول
            </Typography>
        </div>
    )
}

export default NotFoundPage