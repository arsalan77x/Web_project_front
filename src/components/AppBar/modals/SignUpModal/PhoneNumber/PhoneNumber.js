import { TextField, Typography } from "@material-ui/core"
import React, { useState } from "react"
import dataProvider from "../../../../../Data/dataProvider"
import { useSelector, useDispatch } from "react-redux"

import { setUser } from "../../../../../redux/user_slice"
import { setError } from "../../../../../redux/error_slice"

const PhoneNumber = props => {
    const [error, setInputError] = useState({ phone: false, text: "" })
    const dispatch = useDispatch()
    async function sendNumber() {
        const phoneNumber = document.getElementById("phoneNumberInput").value

        if (phoneNumber === "") {
            setInputError({ phone: true, text: "لطفا شماره موبایل خود را وارد کنید" })
        } else if (phoneNumber.length != 11) {
            setInputError({ phone: true, text: "شماره موبایل باید معتبر باشد." })
        } 
        else {
            dispatch(setError({ loading: true }))
            let data = await dataProvider.getOne("customer/signup/ver/" + phoneNumber)
            if (data === "success") {
                props.setPage(props.page + 1)
                dispatch(setUser({ phone: phoneNumber }))
                let dataa = await dataProvider.getOne("customer/signup/ver/" + phoneNumber + "/" + 1)
            }
            dispatch(setError({ loading: false }))
        }

    }

    return (
        <div className="numberInputContainer">
            <p className="signUpTitle">برای عضویت شماره موبایل خود را وارد کنید!</p>
            <TextField
                error={error.phone}
                helperText={error.text}
                variant="outlined"
                type="text"
                className="signUpInput"
                placeholder="- - -  - -  - -  - - 09"
                id="phoneNumberInput" />
            <Typography className="signUpConfirmButton" onClick={sendNumber}>ادامه</Typography>
        </div>
    )
}

export default PhoneNumber