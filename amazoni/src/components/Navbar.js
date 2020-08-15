import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ auth, logout, cart }) => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const guesLinks = (
    <div>
      <Link to="/login">Signin</Link>
      <Link to="/register">Signup</Link>
      <Link to="/cart">
        Cart{" "}
        {cart.cartItems.length > 0 && (
          <span className="cart-link">{cart.cartItems.length}</span>
        )}
      </Link>{" "}
    </div>
  );

  {
    /*  */
  }

  const authLinks = (
    <div>
      <a onClick={() => logout()} href="#!">
        Logout
      </a>
    </div>
  );

  const adminLinks = (
    <div>
      <a href="/dashboardAdmin">Admin</a>{" "}
    </div>
  );

  return (
    <Fragment>
      <header className="header">
        <div className="brand">
          <button onClick={() => openMenu()} className="brand-button">
            &#9776;
          </button>
          <Link to="/">Amazoni</Link>
        </div>
        <div className="header-links">
          {auth.isAuthenticated ? authLinks : guesLinks}
          {auth.isAuthenticated
            ? auth.user === null
              ? null
              : auth.user.isAdmin
              ? adminLinks
              : null
            : null}
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, { logout })(Navbar);
