import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { addShipping } from "../../actions/cart";
import Checkout from "./CheckoutSteps";

const PlaceOrder = ({ addShipping, history }) => {
  const [formData, setFormData] = useState({
    paymentMethod: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // addShipping(formData);
    history.push("placeorder");
  };

  const { paymentMethod } = formData;

  return (
    <Fragment>
      <Checkout step1 step2 step3 />
      <div className="sign-in">
        <div className="sign-in-box">
          <h2>Place Order</h2>
          <form className="register-form" onSubmit={(e) => onSubmit(e)}>
            <div></div>

            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

PlaceOrder.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, addShipping })(
  withRouter(PlaceOrder)
);
