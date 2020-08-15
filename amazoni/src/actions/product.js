import { GET_PRODUCTS, PRODUCTS_FAIL, GET_SINGLE, CLEAR_SINGLE } from "./types";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: CLEAR_SINGLE });

  try {
    const res = await axios.get("/api/product");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: GET_SINGLE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
