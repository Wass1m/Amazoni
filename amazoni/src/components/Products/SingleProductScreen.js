import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { data } from "../../data";
import { connect } from "react-redux";

import { setAlert } from "../../actions/alert";
import { getProductById } from "../../actions/product";
import { addToCart, updateCart } from "../../actions/cart";

const SingleProductScreen = ({
  match,
  setAlert,
  addToCart,
  getProductById,
  product: { product, loading },
}) => {
  useEffect(() => {
    getProductById(match.params.id);
  }, []);

  const [quantity, setQuantity] = useState(1);

  return product === null || loading ? (
    <Fragment>lol</Fragment>
  ) : (
    <Fragment>
      <Link to="/">Back to HomeScreen</Link>
      <div className="single-details">
        <div className="single-product-image">
          <img src={product.image} alt="No image" />
        </div>
        <div className="single-product-info">
          <ul>
            <li>{product.name}</li>
            <li>Rating : {product.rating}</li>
            <li>{product.brand}</li>
            <li>${product.price}</li>
          </ul>
        </div>
        <div className="single-product-actions">
          <ul>
            <li>
              Status : {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </li>
            <li>Price : ${product.price}</li>
            <li>
              Qte :{" "}
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((qte) => (
                  <option key={qte + 1} value={qte + 1}>
                    {qte + 1}
                  </option>
                ))}
              </select>
            </li>
            <li>
              {product.countInStock > 0 ? (
                <button
                  onClick={(e) => addToCart(product._id, quantity)}
                  className="add-to-cart-single primary"
                >
                  Add to cart
                </button>
              ) : (
                <div>out of stock</div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

SingleProductScreen.propTypes = {};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, {
  setAlert,
  getProductById,
  addToCart,
})(SingleProductScreen);
