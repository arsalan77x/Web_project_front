import dataProvider from "../../../Data/dataProvider";
import store from "../../../redux/store";

export async function getSendPrice(address) {
  let data = await dataProvider.getOne(
    "order/sendprice/" + store.getState().user.id + "/" + address._id
  );
  if (data) {
      console.log(data);
    return data.send_price;
  }
  return null;
}
