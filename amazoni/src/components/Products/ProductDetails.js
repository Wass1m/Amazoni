import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const ProductDetails = ({ product }) => {
  return (
    <Fragment>
      <li>
        <div className="product">
          <img className="product-image" src={product.image} alt="no image" />
          <div className="product-name">
            <Link to={`/product/${product._id}`}> {product.name}</Link>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">{product.price}$</div>
          <div className="product-rating">{product.rating} stars (reviews)</div>
        </div>
      </li>
    </Fragment>
  );
};
