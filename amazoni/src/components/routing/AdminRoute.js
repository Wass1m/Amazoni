import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { loadUser } from "../../actions/auth";

const AdminRoute = ({
  component: Component,
  loadUser,
  auth: { loading, isAuthenticated, user },
  ...rest
}) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : user === null ? (
          <Fragment>Loading...</Fragment>
        ) : user.isAdmin === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

AdminRoute.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(AdminRoute);
