import React, { useEffect, useState } from "react"
import "./AddressContainer.scss"
import locationImage from "./location.png";
import { getUserAddresses } from "../../../Data/Utils";
import { Box } from "@material-ui/core";
import BaseModal from "../../../components/modal/base_modal";
import AddAddressModal from "../../../components/AddAddressModal/AddAddressModal";
import AddressCard from "../../../components/cards/AddressCard/AddressCard";

const AddressContainer = props => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getUserAddresses(props.setAddresses)
    }, [])
    const openAddressModal = (e) => {
        setOpen(true)
    }
    return (
        <div className="addressContainerContainer">
            <BaseModal open={open} setOpen={setOpen}>
                <AddAddressModal open={open} setOpen={setOpen} addresses={props.addresses} setAddresses={props.setAddresses}/>
            </BaseModal>
            <p className="payTitle">آدرس ها</p>
            <div className="addressContainer">
                <Box className="payAddAddressContainer" onClick={openAddressModal}>
                    <img className="addAddressImage" src={locationImage} />
                    <p className="addAddressTitle"> افزودن آدرس جدید </p>
                </Box>
                <div className="addressCardContainer">
                    {props.addresses.map((item) => <AddressCard key={item._id} usage="pay" item={item} />)}
                </div>

            </div>
        </div>
    )
}

export default AddressContainer
