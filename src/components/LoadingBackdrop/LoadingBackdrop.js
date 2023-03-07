import React from "react"
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from "react-redux";
import ProgressBar from "./progress";
import { Box } from "@material-ui/core";

const LoadingBackdrop = props => {
    const loading = useSelector(state => state.error.loading)
    return (
        <Backdrop style={{ zIndex: 100000 }} open={loading}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <ProgressBar color="#f4006e"/>
            </Box>
        </Backdrop>
    )
}

export default LoadingBackdrop