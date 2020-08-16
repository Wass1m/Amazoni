import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { loadCart } from "../actions/cart";

const Navbar = ({ auth, logout, cart, loadCart }) => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const guesLinks = (
    <Fragment>
      {" "}
      <Link to="/login">Signin</Link>
      <Link to="/register">Signup</Link>
    </Fragment>
  );

  {
    /*  */
  }

  const authLinks = (
    <a onClick={() => logout()} href="#!">
      Logout
    </a>
  );

  const adminLinks = (
    <Fragment>
      <Link to="/dashboardAdmin">Admin</Link>{" "}
      <Link to="/createProduct">Products</Link>{" "}
    </Fragment>
  );

  useEffect(() => {
    loadCart();
  }, []);

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
          <Link to="/cart">
            Cart{" "}
            {cart.cartItems === undefined
              ? null
              : cart.cartItems.length > 0 && (
                  <span className="cart-link">{cart.cartItems.length}</span>
                )}
          </Link>{" "}
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, { logout, loadCart })(Navbar);
