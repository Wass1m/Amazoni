import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";

const Register = ({ setAlert, registerUser, auth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password dont match", "danger");
    } else {
      registerUser(formData);
    }
  };

  const { name, email, password, password2 } = formData;

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-in">
      <div className="sign-in-box">
        <h2>Sign Up</h2>
        <form className="register-form" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            value={name}
            name="name"
            placeholder="Enter your name"
            onChange={(e) => onChange(e)}
          />
          <input
            type="email"
            value={email}
            name="email"
            placeholder="Enter an email"
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            value={password}
            name="password"
            placeholder="Enter a password"
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            value={password2}
            name="password2"
            placeholder="Enter a password"
            onChange={(e) => onChange(e)}
          />
          <input type="submit" value="Register" />
        </form>
        <h3>Already have an account ?</h3>
        <Link to="/login">
          <button className="btn primary">Login In</button>
        </Link>
      </div>
    </div>
  );
};

Register.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
