import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { Box, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import Logo from "../../images/logo.png"

function ModalHeader(props) {
    const classes = useStyles()
    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between" bgcolor="white">
            <img className={classes.logo} src={Logo} />
            <Typography>{props.text}</Typography>
            <IconButton onClick={handleClose}>
                <CloseIcon color="secondary"  />
            </IconButton>
        </Box>
    )
}
const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: 'white',
        borderTopLeftRadius:'30px',
        borderTopRightRadius:'30px',
        padding:'10px 0px'
    },
    logo: {
        width: '50px',
        height: '50px',
        marginRight:'10px'
    }
}))

export default ModalHeader