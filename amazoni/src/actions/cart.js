import {
  ADD_TO_CART,
  FAIL_ADD_CART,
  MODIFY_ITEM,
  DELETE_ITEM,
} from "../actions/types";
import axios from "axios";
import product from "../reducers/product";
export const addToCart = (productID, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/product/${productID}`);

    const orderitem = {
      name: data.name,
      qty: quantity,
      image: data.image,
      price: data.price,
      product: data._id,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: orderitem,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_CART,
    });
  }
};

export const updateCart = (productID, quantity) => async (dispatch) => {
  try {
    dispatch({
      type: MODIFY_ITEM,
      payload: {
        productID,
        quantity,
      },
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_CART,
    });
  }
};

export const deleteItem = (productID) => (dispatch) => {
  try {
    dispatch({
      type: DELETE_ITEM,
      payload: productID,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ADD_CART,
    });
  }
};
