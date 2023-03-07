import React, { useState } from "react"
import { Box, makeStyles } from "@material-ui/core";
import SignUpModal from "./SignUpModal/SignUpModal";
import LoginModal from "./LoginModal/LoginModal";


const AuthModal = (props) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)

    return (
        <Box className={classes.root}>
            {

                    page === 0 ? <LoginModal page={page} setPage={setPage} setOpen={props.setOpen}/> :
                        page > 0 ? <SignUpModal page={page} setPage={setPage} setOpen={props.setOpen} /> : null
            }
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '760px',
        [theme.breakpoints.down("xs")]: {
            width: '95%'
        },
        background: '#f1f1f1',
        boxShadow: '0px 10px 20px -5px rgba(42, 48, 59, 0.2)',
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        boxSizing: 'border-box',
        borderRadius: '20px',
    },
}))

export default AuthModal