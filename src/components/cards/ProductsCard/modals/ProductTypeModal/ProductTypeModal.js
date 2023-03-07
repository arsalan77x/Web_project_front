import React from "react"
import "./ProductTypeModal.scss"
import DesktopProductCardItem from "../../DesktopProductsCard/DesktopProductCardItem/DesktopProductCardItem"
import { Box, makeStyles } from "@material-ui/core"
import ModalHeader from "../../../../modal/modal_header"
import SubmitButton from "../../../../buttons/confirm_botton"
function ProductTypeModal(props) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <ModalHeader text="اندازه محصول را انتخاب کنید" setOpen={props.setOpen} />
            <Box padding="10px">
                <DesktopProductCardItem
                    types={props.product.types}
                    discount={props.product.off_percent}
                    product={props.product}/>
                <SubmitButton text="تایید" onClick={e => props.setOpen(false)} style={{ margin: "10px 0px" }} />
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
        flexDirection: 'column',
    },
}))

export default ProductTypeModal