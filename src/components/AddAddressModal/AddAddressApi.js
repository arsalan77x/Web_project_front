import dataProvider from "../../Data/dataProvider";
import { getUserAddresses } from "../../Data/Utils";
import { setError } from "../../redux/error_slice";
import store from "../../redux/store";

export const AddAddress = async (
  setAddresses,
  addresses,
  title,
  address,
  position,
  setInputError,
  setOpen
) => {
  store.dispatch(setError({ loading: true }));
  setInputError({
    title: title === "",
    titleText: title === "" ? "عنوان آدرس خود را وارد کنید" : "",
    address: address === "",
    addressText: address === "" ? "آدرس خود را وارد کنید" : "",
  });
  if (title != "" && address != "") {
    const customerid = store?.getState()?.user?.id;
    let addressInfo = {
      title: title,
      detail: address,
      longitude: position.lng.toString(),
      latitude: position.lat.toString(),
    };
    let addressBody = { address: addresses };
    addressBody.address.push(addressInfo);

    let data = await dataProvider.update("customer/one/" + customerid, {
      data: addressBody,
    });
    getUserAddresses(setAddresses);
    setOpen(false);
    store.dispatch(setError({ loading: false }));
  } else store.dispatch(setError({ loading: false }));
};
