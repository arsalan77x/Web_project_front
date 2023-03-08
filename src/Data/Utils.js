import { finalShopping } from "../Pages/Pay/FinishShopping/FinishShoppingApi";
import dataProvider from "./dataProvider";
import store from "../redux/store";
import { setError } from "../redux/error_slice";
import { emptyUser, setUser } from "../redux/user_slice";
import { emptyBasket } from "../redux/basket_slice";
import { emptyPrices, setPrices } from "../redux/prices_slice";



export const calculateBasketPrices = async (send, shop_deliver) => {
  const basket = store.getState().basket;
  const prices = store.getState().prices;
  let result = { ...prices };
  result.send = send ?? prices.send;
  result.shop_deliver = shop_deliver ?? prices.shop_deliver;
  result.products_without_off = 0;
  result.off = 0;
  result.pack = 0;
  let i = 0,
    length = basket.length,
    item;
  while (i < length) {
    item = basket[i];
    result.products_without_off += item.price * item.count;
    result.off += (item.price * item.discount * item.count) / 100;
    result.pack += (item.pack ?? 0) * item.count;
    i++;
  }
  result.off = Number(result.off.toFixed(2));
  result.products_with_off = result.products_without_off - result.off;
  result.total =
    result.pack +
    (result.send && !result.shop_deliver ? result.send : 0) +
    result.products_with_off;
  store.dispatch(setPrices(result));
};

export const goToPayPage = (basketLength, history) => {
  let label = "";
  if (store.getState().user.login) {
    if (basketLength !== 0) {
      var field = document.getElementById("orderCaptionField");
      sessionStorage.setItem("orderCaption", field ? field.value : "");
      history.push("/pay");
    } else {
      label = "سبد خرید شما خالی است";
      store.dispatch(
        setError({ open: true, message: label, state: "warning" })
      );
    }
  } else {
    label = "لطفا وارد حساب کاربری خود شوید";
    store.dispatch(setError({ open: true, message: label, state: "warning" }));
  }
};

export const buy = (
  basketLength,
  addresses,
  deliveryType,
  payType,
  history
) => {
  var label = "";
  if (store.getState().user.login) {
    if (basketLength !== 0)
      if (
        !store.getState().user.order?.address?._id &&
        deliveryType !== "shop"
      ) {
        if (addresses.length === 0) {
          label = "لطفا یک آدرس اضافه کنید";
        } else {
          label = "لطفا یک آدرس انتخاب کنید";
        }
        store.dispatch(
          setError({ open: true, message: label, state: "warning" })
        );
      } else {

        finalShopping(deliveryType, payType, history);
      }
    else {
      label = "سبد خرید شما خالی است";
      store.dispatch(
        setError({ open: true, message: label, state: "warning" })
      );
    }
  } else {
    label = "لطفا وارد حساب کاربری خود شوید";
    store.dispatch(setError({ open: true, message: label, state: "warning" }));
  }
};

export const getUserAddresses = async (setAddresses) => {
  store.dispatch(setError({ loading: true }));
  let data = await dataProvider.getOne(
    "customer/one/" + store.getState().user.id
  );
  if (data.address) {
    setAddresses(data.address);
  }
  store.dispatch(setError({ loading: false }));
};

export const removeStateFromLocaleStorage = () => {
  store.dispatch(emptyBasket());
  store.dispatch(emptyPrices());
  store.dispatch(emptyUser());
};

export const logout = () => {
  store.dispatch(setUser({ login: false }));
  localStorage.clear();
  sessionStorage.clear();
  store.dispatch(setError({ loading: false }));
  // window.location.href = "https://www.bastanitarasht.ir"
};
