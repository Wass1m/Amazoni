import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { addPayment } from "../../actions/cart";
import Checkout from "./CheckoutSteps";

const Payment = ({ addPayment, history }) => {
  const [formData, setFormData] = useState({
    paymentMethod: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPayment(formData);
    history.push("placeorder");
  };

  const { paymentMethod } = formData;

  return (
    <Fragment>
      <Checkout step1 step2 />
      <div className="sign-in">
        <div className="sign-in-box">
          <h2>Paymen options</h2>
          <form className="register-form" onSubmit={(e) => onSubmit(e)}>
            <div className="register-form-radio">
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="paypal"
                onChange={(e) => onChange(e)}
              />
              <label for="paymentMethod">Paypal</label>
            </div>

            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Payment.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, addPayment })(
  withRouter(Payment)
);
