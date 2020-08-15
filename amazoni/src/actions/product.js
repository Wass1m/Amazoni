import {
  GET_PRODUCTS,
  PRODUCTS_FAIL,
  GET_SINGLE,
  CLEAR_SINGLE,
  CREATE_PRODUCT,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

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

export const createProduct = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/product", formData, config);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Product created", "success"));
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
