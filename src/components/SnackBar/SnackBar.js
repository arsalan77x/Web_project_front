import React from "react"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux'
import { setError } from "../../redux/error_slice";
import { Typography } from "@material-ui/core";

function Alert(props) {
    const useStyles = makeStyles({
        root: {
            justifyContent: "space-between",
            alignItems: "center",
            padding: '6px'
        },
        icon:{
            marginRight:'0px',
            fontSize:'30px'
        },
        action:{
            paddingLeft:'0px',
            marginLeft:'0px',
            fontSize:'30px'
        },
    })
    const classes = useStyles()
    return <MuiAlert classes={{icon:classes.icon, action:classes.action, root:classes.root}}  elevation={12} variant="filled" {...props} />;
}


const SnackBar = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(setError({ open: false }))
    }
    return (
        <Snackbar open={error.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert  onClose={handleClose} severity={error.state}>
                <Typography style={{margin:"0px 10px"}} variant={!matches ? "h5" : "h6"}>{error.message}</Typography>
            </Alert>
        </Snackbar>
    )
}

export default SnackBar