import React from "react"
import "./ContentWrapper.scss"

const ContentWrapper = props => {

    return(
        <div className="contentWrapper">
            {props.children}
        </div>
    )
}

export default ContentWrapper