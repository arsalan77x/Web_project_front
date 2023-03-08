import React from "react"
import ProfileAddress from "../ProfileAddress/ProfileAddress";
import BuyHistoryCard from "../BuyHistoryCard/BuyHistoryCard";
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import { Route, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";


const MobileProfile = (probs) => {

    return (
        <Box bgcolor={'white'} boxSizing={'border-box'} margin={'10px'}>
            <Switch>
                <Route path="/profile/buyHistory" component={BuyHistoryCard} />
                <Route path="/profile/profileInfo" component={ProfileInfo} />
                <Route path="/profile/profileAddress" component={ProfileAddress} />
            </Switch>
        </Box>
    )
}

export default MobileProfile