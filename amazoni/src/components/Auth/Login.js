import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";

const Login = ({ setAlert, loginUser, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  const { email, password } = formData;

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-in">
      <div className="sign-in-box">
        <h2>Log in</h2>
        <form className="register-form" onSubmit={(e) => onSubmit(e)}>
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

          <input type="submit" value="Login" />
        </form>
        <h3>Dont have an account ?</h3>
        <Link to="/register">
          <button className="btn primary">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, loginUser })(Login);
