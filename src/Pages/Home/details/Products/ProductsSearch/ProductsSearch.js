import React, { useContext, useEffect, useState } from "react"
import "./ProductsSearch.scss"
import APP_URL from "../../../../../Data/APP_URL"
import { addEventListener, scrollToCategory, search } from "./ProductsSearchApi";
import { Box, makeStyles } from "@material-ui/core";
import { ProductsContext } from "../../../../../Data/ProductsContext";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import dataProvider from "../../../../../Data/dataProvider";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

const ProductsSearch = props => {

    const classes = useStyles()
    const productContext = useContext(ProductsContext)
    const [activeLink, setActiveLink] = useState(0)
    const [categories, setCategories] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        addEventListener(setActiveLink, null, "desktopLink")
        getData()
    }, [])

    useEffect(() => {
        const { cancel, token } = axios.CancelToken.source();
        const timeOutId = setTimeout(() => search(productContext, query, token, props.setLoading), 500);
        return () => cancel() || clearTimeout(timeOutId)
    }, [query])

    async function getData() {
        let data = await dataProvider.getList("category/list")
        if (data)
            setCategories(data)
    }


    return (
        <div className="ProductsSearchContainer">
            <Box bgcolor="white" padding="2px" marginBottom="10px"
                display="flex" alignItems="center" justifyContent="space-between">
                <InputBase
                    onChange={(e) => setQuery(e.target.value)}
                    className={classes.input}
                    placeholder="جستجو در محصولات"
                />
                <IconButton disabled className={classes.iconButton}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <div id="productsSearchTypeContainer" className="productsSearchTypeContainer">

                {categories.map((item, index) =>
                    <Item key={item._id} item={item} index={index} activeLink={activeLink} setActiveLink={setActiveLink} />
                )}

            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}))

const Item = props => {
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
    return (
        <Box style={{ cursor: 'pointer' }} name="desktopLink" {...props}>
            <div {...props} className={(props.activeLink === props.index) ? "productsTypeContainerActive" : "productsTypeContainer"}
                onClick={(e) => scrollToCategory(props.index, e, props.setActiveLink, matches)}>
                <img src={APP_URL + props.item.icon} className="productsTypeIcon" />
                <p>{props.item.name}</p>
            </div>
        </Box>
    )
}

export default ProductsSearch