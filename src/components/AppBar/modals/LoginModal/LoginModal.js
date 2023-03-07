import React, { useState } from "react"
import "./LoginModal.css"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import login from "./LoginApi";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import SubmitButton from "../../../buttons/confirm_botton";

const LoginModal = (props) => {
    const [error, setError] = useState({ user: false, userText: "", pass: false, passText: "" })
    const classes = useStyles()

    const goToSignUpModal = (e) => {
        console.log("hello")
        props.setPage(props.page + 1)
    }

    const callLogin = (e) => {
        login(document.getElementById("loginUsernameInput").value,
            document.getElementById("loginPasswordInput").value, setError, props.setOpen)
    }
    return (
        <Box className={classes.root}>
            <Box className="loginHeader">ورود به حساب کاربری</Box>
            <Box display="flex" flexDirection="column" padding="0px 10px">
                <TextField
                    className={classes.textfield}
                    error={error.user}
                    helperText={error.userText}
                    variant="outlined"
                    id="loginUsernameInput"
                    placeholder="شماره موبایل خود را وارد کنید"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PermIdentityIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className={classes.textfield}
                    error={error.pass}
                    helperText={error.passText}
                    variant="outlined"
                    type="password"
                    id="loginPasswordInput"
                    placeholder="رمز عبور"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {/* <Typography color="textSecondary" gutterBottom paragraph style={{cursor:'pointer'}} onClick={e => props.setPage(props.page - 1)}>فراموشی رمز عبور</Typography> */}
                <SubmitButton text="تایید" onClick={callLogin} />
                <p className="loginGotoSignup">برای عضویت <Typography className="linkText" onClick={goToSignUpModal}> کلیک </Typography> کنید</p>
            </Box>
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
        display: 'flex',
        flexDirection: 'column'
    },
    textfield: {
        marginBottom: '10px'
    },
}))

export default LoginModal