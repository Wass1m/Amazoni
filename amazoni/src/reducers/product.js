import {
  PRODUCTS_FAIL,
  GET_PRODUCTS,
  GET_SINGLE,
  CLEAR_SINGLE,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/types";
const initialState = {
  loading: true,
  errors: {},
  products: [],
  product: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE:
      return { ...state, loading: false, product: payload };
    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case PRODUCTS_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    case CLEAR_SINGLE:
      return {
        ...state,
        loading: false,
        product: null,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === payload.id ? payload : item
        ),
      };
    default:
      return state;
  }
}
