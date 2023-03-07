import React, { useEffect, useState } from "react"
import "./AddAddressModal.scss"
import TextField from '@material-ui/core/TextField';
import { AddAddress } from "./AddAddressApi";

import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Box, makeStyles, Typography } from "@material-ui/core";
import { tarasht_POSITION } from "../../Data/APP_URL";
import ModalHeader from "../modal/modal_header";


const useStyles = makeStyles(theme => ({
    input: {
        width: "80%",
        fontSize: '16px',
        marginBottom: '20px'
    },
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
        flexDirection: 'column',
    },
}))

const AddAddressModal = props => {
    const classes = useStyles()
    const [field, setField] = useState(false)
    const [position, setPosition] = useState({lat: 0.0, lng: 0.0})

    return (
        <Box className={classes.root}>
            <ModalHeader text="انتخاب آدرس" setOpen={props.setOpen} />

            <Box padding="10px 20px" textAlign="center">
                    {!field && <AddressFields setAddresses={props.setAddresses} addresses={props.addresses} position={position} setOpen={props.setOpen} />}
        
            </Box>
        </Box>
    )
}

function AddressFields(props) {
    const [error, setError] = useState({ title: false, titleText: "", address: false, addressText: "" })
    const classes = useStyles()

    const callAddAddress = () => {
        AddAddress(props.setAddresses,props.addresses,
            document.getElementById("addAddressTitleInput").value,
            document.getElementById("addressInput").value,
            props.position, setError, props.setOpen)
    }
    return (
        <div>
            <TextField
                placeholder="عنوان آدرس"
                variant="outlined"
                error={error.title}
                helperText={error.titleText} type="text" className={classes.input} id="addAddressTitleInput"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnOutlinedIcon style={{ color: '#d7d7d7' }} fontSize="large" />
                        </InputAdornment>
                    ),
                }} />
            <TextField
                placeholder="آدرس"
                variant="outlined"
                error={error.address}
                helperText={error.addressText}
                id="addressInput"
                className={classes.input}
                multiline
                rowsMax={4}
                rows={4}/>
            <img className="formDivider" />

            <Typography className="addAddressConfirmButton" onClick={callAddAddress}>
                ثبت
            </Typography>
        </div>
    )
}

export default AddAddressModal