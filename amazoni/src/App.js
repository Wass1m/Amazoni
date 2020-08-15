import React, { Fragment, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { data } from "./data";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import Navbar from "./components/Navbar";
import { Footer, Slider } from "./components/Slider";
import SingleProductScreen from "./components/Products/SingleProductScreen";
import Register from "./components/Auth/Register";
import { loadUser } from "./actions/auth";

import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/Alert";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/Dashboard";
import DashboardAdmin from "./components/DashboardAdmin";
import AdminRoute from "./components/routing/AdminRoute";
import CartScreen from "./components/cart/CartScreen";
import CreateProduct from "./components/Admin/CreateProduct";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <div className="grid-container">
            <Navbar />

            <Slider />
            <main className="main">
              <div className="content">
                <Alert />
                <Route exact path="/" component={HomeScreen} />
                <Switch>
                  <Route
                    exact
                    path="/product/:id"
                    component={SingleProductScreen}
                  />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/cart" component={CartScreen} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <AdminRoute
                    exact
                    path="/dashboardAdmin"
                    component={DashboardAdmin}
                  />
                  <AdminRoute
                    exact
                    path="/createProduct"
                    component={CreateProduct}
                  />
                </Switch>
              </div>
            </main>
            <footer className="footer">All right reserved</footer>
          </div>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
}

export default App;
