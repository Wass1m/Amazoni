import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartScreen = ({ auth, cart }) => {
  return (
    <Fragment>
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {cart.cartItems === undefined ? null : cart.cartItems.length > 0 ? (
              cart.cartItems.map((item) => (
                <CartItem key={item.product} cartItem={item} />
              ))
            ) : (
              <div>No Item in the cart</div>
            )}
          </ul>
        </div>
        <div className="cart-actions">
          <h3>
            Subtotal :{" "}
            {cart.cartItems === undefined
              ? null
              : cart.cartItems.reduce(
                  (sum, elm) => sum + parseInt(elm.qty),
                  0
                )}{" "}
          </h3>
          <h3>
            Total :${" "}
            {cart.cartItems === undefined
              ? null
              : cart.cartItems.reduce(
                  (sum, elm) => sum + parseInt(elm.qty) * parseInt(elm.price),
                  0
                )}{" "}
          </h3>
          <Link to="/shipping">
            {" "}
            <button className="btn primary"> Proceed to checkout </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

CartScreen.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps)(CartScreen);
