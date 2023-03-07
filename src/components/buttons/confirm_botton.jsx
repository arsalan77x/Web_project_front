import { Button, makeStyles } from "@material-ui/core"
import React from "react"

function SubmitButton(props) {
    const classes = useStyles()
    return (
        <Button
            {...props}
            className={classes.backButton}>
            {props.text}
        </Button>
    )
}

const useStyles = makeStyles(theme => ({
    backButton: {
        display: "inline-block",
        padding: "10px",
        width: "100%",
        fontSize: "20px",
        color: "white",
        // border: "2px dashed white",
        borderRadius: "10px",
        boxSizing: "border-box",
        transitionDuration: "500ms",
        background: "#f4006e",
        "&:hover":{
            background: "#f4006e"
        }
    },
}))
export default (SubmitButton)