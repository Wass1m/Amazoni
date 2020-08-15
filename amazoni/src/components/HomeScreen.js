import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { data } from "../data";
import { Link } from "react-router-dom";
import { ProductDetails } from "./Products/ProductDetails";
import { connect } from "react-redux";
import { getAllProducts } from "../actions/product";
import auth from "../reducers/auth";

const HomeScreen = ({ auth, product, getAllProducts }) => {
  useEffect(() => {
    getAllProducts();
  }, []);

  return auth.loading ? (
    <Fragment>
      <h1>Loading</h1>
    </Fragment>
  ) : (
    <div>
      <ul className="products">
        {product.products.map((product) => (
          <ProductDetails key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};

HomeScreen.propTypes = {};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllProducts })(HomeScreen);
