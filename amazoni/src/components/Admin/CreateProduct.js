import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { createProduct, updateProduct } from "../../actions/product";
import { getAllProducts, getProductById } from "../../actions/product";

const CreateProduct = ({
  setAlert,
  createProduct,
  auth,
  updateProduct,
  getAllProducts,
  getProductById,
  product: { products, product },
}) => {
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
    formVisible: false,
    edit: false,
    idProd: null,
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
    formVisible,
    edit,
    idProd,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(edit);
    if (edit === false) {
      createProduct(formData);
    } else if (edit === true) {
      updateProduct(formData, idProd);
    }
  };

  const openForm = () => {
    setFormData({ edit: false, formVisible: !formVisible });
  };

  const editProduct = (product) => {
    setFormData({
      idProd: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      category: product.category,
      rating: product.rating,
      numReviews: product.numReviews,
      description: product.description,
      countInStock: product.countInStock,
      formVisible: !formVisible,
      edit: true,
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="product-header">
      <div className="product-titles-admin">
        <h2>Products Dashboard</h2>
        <button className="btn primary" onClick={() => openForm()}>
          Create Product
        </button>
      </div>

      {formVisible && (
        <div className="sign-in">
          <div className="sign-in-box">
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
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>{" "}
                  <button className="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CreateProduct.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
})(CreateProduct);
