import { ADD_TO_CART, MODIFY_ITEM } from "../actions/types";
import Cookie from "js-cookie";

const initialState = {
  cartItems: [],
  shipping: {},
  payment: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      let item = payload;
      const product = state.cartItems.find(
        (elm) => elm.product === item.product
      );
      if (product) {
        const tempItems = state.cartItems.map((elm) =>
          elm.product === item.product ? item : elm
        );
        Cookie.set("cartItems", JSON.stringify(tempItems));
        return {
          cartItems: state.cartItems.map((elm) =>
            elm.product === item.product ? item : elm
          ),
        };
      }

      let tempItems2 = [...state.cartItems, payload];

      Cookie.set("cartItems", JSON.stringify(tempItems2));
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    case MODIFY_ITEM:
      let modify = payload;
      let qty = modify.quantity;
      const modifyItem = state.cartItems.map((elm) =>
        elm.product === modify.productID ? { ...elm, qty } : elm
      );
      Cookie.set("cartItems", JSON.stringify(modifyItem));
      return {
        cartItems: modifyItem,
      };
    default:
      return state;
  }
}
