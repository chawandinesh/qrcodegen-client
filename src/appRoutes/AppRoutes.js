import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QRGenerator from "../pages/QRGenerator";
import HeaderComponent from "../components/Header";
import Address from "../components/Address";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Login from "../pages/Login";
import App from "../App";
import "../App.css";
const { Content } = Layout;
const AppLayout = (props) => {
  return (
    <Layout>
      <HeaderComponent />
      <Content
        //  className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64,
          minHeight: "90vh",
          height: "auto",
        }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};

function AppRoutes(props) {
  return (
    <Router>
      <App>
        <AppLayout>
          <Switch>
            <Route path="/about">
              <About {...props} />
            </Route>
            <Route exact path="/cart">
              <Cart {...props} />
            </Route>
            <Route exact path="/address">
              <Address {...props} />
            </Route>
            <Route exact path="/login">
              <Login {...props} />
            </Route>
            <Route exact path="/">
              <QRGenerator {...props} />
            </Route>
          </Switch>
        </AppLayout>
      </App>
    </Router>
  );
}

export default AppRoutes;
