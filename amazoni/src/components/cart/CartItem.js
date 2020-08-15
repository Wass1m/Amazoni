import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { updateCart } from "../../actions/cart";
import { connect } from "react-redux";

const CartItem = ({ cartItem, updateCart }) => {
  return (
    <Fragment>
      <li>
        <div className="cart-image">
          <img src={cartItem.image} />
        </div>

        <div className="cart-name">
          {cartItem.name}
          <div>
            Qty :{" "}
            <select
              value={cartItem.qty}
              onChange={(e) => updateCart(cartItem.product, e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="cart-price">{cartItem.price}$</div>
      </li>
    </Fragment>
  );
};

CartItem.propTypes = {};

export default connect(null, { updateCart })(CartItem);
