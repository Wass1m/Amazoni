import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { createProduct } from "../../actions/product";

const CreateProduct = ({ setAlert, createProduct, auth }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    rating: "",
    numReviews: "",
    description: "",
    countInStock: "",
  });

  const {
    name,
    price,
    image,
    brand,
    category,
    rating,
    numReviews,
    description,
    countInStock,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(formData);
  };

  return (
    <div className="sign-in">
      <div className="sign-in-box">
        <h2>Create Product</h2>
        <form className="register-form" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            value={name}
            name="name"
            placeholder="Enter the name of the product"
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            value={price}
            name="price"
            placeholder="Enter the price"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={image}
            name="image"
            placeholder="Enter the image URI"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={brand}
            name="brand"
            placeholder="Enter the brand"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={category}
            name="category"
            placeholder="Enter the category"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={rating}
            name="rating"
            placeholder="Enter the rating"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={numReviews}
            name="numReviews"
            placeholder="Enter the numReviews"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={description}
            name="description"
            placeholder="Enter the description"
            onChange={(e) => onChange(e)}
          />

          <input
            type="text"
            value={countInStock}
            name="countInStock"
            placeholder="Enter the countInStock"
            onChange={(e) => onChange(e)}
          />

          <input type="submit" value="Create product" />
        </form>
      </div>
    </div>
  );
};

CreateProduct.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProduct })(CreateProduct);
