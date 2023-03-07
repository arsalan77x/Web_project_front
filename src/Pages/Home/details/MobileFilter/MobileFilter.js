import React, { useContext, useEffect, useState } from "react"
import "./MobileFilter.scss"
import { TextField } from "@material-ui/core"
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { ProductsContext } from "../../../../Data/ProductsContext";
import { search } from "../Products/ProductsSearch/ProductsSearchApi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        margin: theme.spacing(3),
        width:'100%'
    },
    filterBar: {
        width: "50%",
        marginLeft: "10px",
        marginRight: theme.spacing(4)
    }
}))

const MobileFilter = props => {
    const classes = useStyles()
    const [currency, setCurrency] = useState('1')
    const [query, setQuery] = useState("")
    const productContext = useContext(ProductsContext)
    const handleChange = (event) => {
        setCurrency(event.target.value)
    }

    useEffect(() => {
        const { cancel, token } = axios.CancelToken.source();
        const timeOutId = setTimeout(() => search(productContext, query, token, props.setLoading), 500);
        return () => cancel() || clearTimeout(timeOutId)
    }, [query])

    return (
        <div className="mobileFilterContainer">
            <TextField
                onChange={(e) => setQuery(e.target.value)}
                className={classes.searchBar}
                placeholder="جستجو در محصولات"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} />

                {/* filter textfield VV */}


            {/* <TextField
                className={classes.filterBar}
                select
                value={currency}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ListAltIcon />
                        </InputAdornment>
                    ),
                }}>
                {getFilterData().map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField> */}
        </div>
    )
}

export default MobileFilter