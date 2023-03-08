import dataProvider from "../../../Data/dataProvider";
import { removeStateFromLocaleStorage } from "../../../Data/Utils";
import { setError } from "../../../redux/error_slice";
import store from "../../../redux/store";

export const finalShopping = async (deliveryType, payType, history) => {
  store.dispatch(setError({ loading: true }));
  const basket = store.getState().basket;
  const customerId = store.getState().user.id;

  let productsIds = [];
  for (let item of basket) {
    productsIds.push(item.productId);
  }

  let products = [];

  productsIds.map((productid, index) => {
    let item = basket.filter((item) => item.productId === productid);
    let detail = {
      product: productid,
      types: item,
    };
    
    products.push(detail);
  });

  const order = {
    product_id: productsIds,
    customer_id: customerId,
    address: store.getState().user?.order?.address ?? {},
    state: "",
    caption: sessionStorage.getItem("orderCaption"),
    deliver_type: deliveryType === "shop" ? "در محل" : "ارسال",
    pay_type: payType,
    detail: products,
  };

  let data = await dataProvider.create("order/one", { data: order });
  if (data?.url) {
    removeStateFromLocaleStorage();
    store.dispatch(setError({ loading: false }));
    window.location.href = data.url;
  } else if (data?.message === "offline") {
    removeStateFromLocaleStorage();
    store.dispatch(setError({ loading: false }));
    history.push("/profile/buyHistory");
  }
};
