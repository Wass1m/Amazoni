import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { addShipping } from "../../actions/cart";
import Checkout from "./CheckoutSteps";

const Shipping = ({ addShipping, history }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addShipping(formData);
    history.push("payment");
  };

  const { city, postalCode, address, country } = formData;

  return (
    <Fragment>
      <Checkout step1 />
      <div className="sign-in">
        <div className="sign-in-box">
          <h2>Shipping</h2>
          <form className="register-form" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              value={address}
              name="address"
              placeholder="Enter your address"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              value={city}
              name="city"
              placeholder="Enter your city"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              value={postalCode}
              name="postalCode"
              placeholder="Enter your postalCode"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              value={country}
              name="country"
              placeholder="Enter your country"
              onChange={(e) => onChange(e)}
            />

            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Shipping.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, addShipping })(
  withRouter(Shipping)
);
