import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Modal from "@material-ui/core/Modal"

function BaseModal(props) {
    const classes = useStyles()

    const handleClose = () => {
        if (props.onClose) {
            props.onClose()
        }
        else
            props.setOpen(false);
    };
    return (
        <div>
            <Modal
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {props.children}
            </Modal>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    modal: {
        overflowY: 'auto',
        "&::-webkit-scrollbar": {
            display: 'none'
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
    }
}))



export default BaseModal