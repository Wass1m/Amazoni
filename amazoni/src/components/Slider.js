import React, { Fragment } from "react";

export const Slider = () => {
  const removeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <Fragment>
      <aside className="sidebar">
        <h3>Shopping categories</h3>
        <button className="sidebar-close-button" onClick={() => removeMenu()}>
          x
        </button>
        <ul>
          <li>
            <a href="pants.html">Pants</a>
          </li>

          <li>
            <a href="pants.html">Shirts</a>
          </li>
        </ul>
      </aside>
    </Fragment>
  );
};
