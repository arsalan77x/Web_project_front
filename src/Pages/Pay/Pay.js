import React, { useState } from "react";
import "./Pay.scss";
import AddressContainer from "./AddressContainer/AddressContainer"
import FinishShopping from "./FinishShopping/FinishShopping"
import Footer from "../../components/Footer/Footer";
import PayBasket from "./PayBasket/PayBasket";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"

const Pay = props => {
  const [addresses, setAddresses] = useState([])
  return (
    <div className="payContainer">
      <ContentWrapper>

        <div className="payBodyContainer">
          <PayBasket />
          <AddressContainer addresses={addresses} setAddresses={setAddresses}/>
          <FinishShopping addresses={addresses}/>
        </div>
      </ContentWrapper>
      <Footer color="pay" />

    </div>
  )
}

export default Pay;
