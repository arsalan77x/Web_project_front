import React, { useEffect, useState } from "react"
import { getUserAddresses } from "../../../Data/Utils"
import { makeStyles, InputBase, Button, Box, Paper, Typography } from "@material-ui/core"
import BaseModal from "../../../components/modal/base_modal";
import AddAddressModal from "../../../components/AddAddressModal/AddAddressModal";
import AddressCard from "../../../components/cards/AddressCard/AddressCard";
import AddIcon from '@material-ui/icons/Add';

const ProfileAddress = probs => {

    const [open, setOpen] = useState(false)
    const [addresses, setAddresses] = useState([])
    const classes = useStyles()
    const openAddressModal = () => {
        setOpen(true)
    }

    useEffect(() => {
        getUserAddresses(setAddresses)
    }, [])

    return (
        <Box paddingBottom={"50px"}>
            <BaseModal open={open} setOpen={setOpen}>
                <AddAddressModal open={open} setOpen={setOpen} addresses={addresses} setAddresses={setAddresses} />
            </BaseModal>
            {console.log(addresses)}
            <Paper elevation={0} className={classes.addressHeader}>
                <Typography variant="h5">آدرس ها</Typography>
                <Button color="secondary" variant="outlined"
                    style={{ fontSize: '1.2rem', paddingRight: '0px' }}
                    startIcon={<AddIcon style={{ marginLeft: '5px' }} />}
                    onClick={openAddressModal}>
                    آدرس جدید
                </Button>

            </Paper>
            <Box padding={'10px'} bgcolor={'#f1f1f1'}>
                {addresses.map(item => <AddressCard key={item._id} usage="profile" item={item} />)}
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    addressHeader: {
        position: 'sticky',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        top: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
        zIndex: 1,
        borderRadius: 0,
        paddingTop: '30px'
    },
})
export default ProfileAddress