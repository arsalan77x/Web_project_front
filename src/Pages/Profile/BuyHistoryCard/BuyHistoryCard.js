import React, { useEffect, useState } from "react"
import "./BuyHistoryCard.scss"
import Divider from "@material-ui/core/Divider";
import { buyHistory } from "./BuyHistoryApi";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import BuyHistoryStepper from "../../../components/cards/BuyHistoryStepper/BuyHistoryStepper";
import { Link } from "react-router-dom";



const BuyHistoryCard = (probs) => {

    const validate = text => {
        if(text)
        return text.toLocaleString()
    }

    const [buyHistoryCards, setBuyHistoryCards] = useState([])

    useEffect(() => {
        buyHistory(setBuyHistoryCards)
    }, [])

    const buyHistoryListItem = buyHistoryCards.map(item =>

        <div className="buyHistoryCard" key={item._id}>
            <BuyHistoryStepper state={item.state}/>
            <Divider orientation='horizontal' />
            <div className="buyHistoryDetailsContainer">
                <p className="buyHistoryTime">{item.time.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))}</p>
                <Divider orientation="vertical" flexItem />
                <p className="buyHistoryDate">{item.date.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))}</p>
                <Divider orientation="vertical" flexItem />
                <p className="buyHistoryDeliverType">{item.deliver_type}</p>
                <a href={"/factor/" + item._id} target='blank' className="buyHistoryMoreDetails">
                    <p className="buyHistoryMoreDetailsText">مشاهده   سفارش</p>
                    <NavigateBeforeIcon color="secondary" />
                </a>
            </div>
            <p className="buyHistoryTotalPrice">مبلغ کل: {validate(item.price_after_off)} تومان</p>
        </div>
    )
    return (
        <div>
            { buyHistoryListItem}
        </div>
    )
}

export default BuyHistoryCard