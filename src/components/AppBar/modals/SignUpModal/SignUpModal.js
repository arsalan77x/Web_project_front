import React from "react"
import "./SignUpModal.scss"
import { Box } from "@material-ui/core";
import SignUpForm from "./SignUpForm/SignUpForm";
import PhoneNumber from "./PhoneNumber/PhoneNumber";

import ModalHeader from "../../../modal/modal_header";

const SignUpModal = props => {

    return (
        <Box>
            <ModalHeader text="عضویت در بستنی طرشت" setOpen={props.setOpen} />
            {
                (props.page === 1) ? <PhoneNumber page={props.page} setPage={props.setPage} /> :
                        (props.page === 2) ? <SignUpForm page={props.page} setPage={props.setPage} setOpen={props.setOpen}/> : null
            }
        </Box>
    )

}

export default SignUpModal