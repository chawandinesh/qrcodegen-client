import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { QRContext } from "../context/context";
import "../App.css";

const { Header, Content, Footer } = Layout;

const HeaderComponent = () => {
  const { state, setState } = React.useContext(QRContext);
  const [current, setCurrent] = React.useState(1);
  // console.log(state.generatedCodes.length, 'state...')
  const handleClick = (e) => {
    console.log(e.key);
    setState({ ...state, current: e.key });
    window.localStorage.setItem("header", e.key);
  };
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 10,
        width: "100%",
      }}
    >
      <div
        style={{
          float: "left",
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
            marginRight: "1em",
            display: "inline",
            width: 100,
            lineHeight: "54px",
          }}
        >
          QRCodeGenerator
        </h2>
      </div>

      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "#fff" }}>QR Code Generator</h1> */}
      <Menu
        theme="dark"
        onClick={handleClick}
        // key="1"
        selectedKeys={localStorage.getItem("header")}
        mode="horizontal"
        // defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px", fontSize: "20px" }}
      >
        <Menu.Item key="1">
          <Link to="/">Generate</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}>
          <Link to="/login" style={{ paddingRight: "10px" }}>
            Login
          </Link>
        </Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <Link to="/cart">
            <ShoppingCartOutlined />
            Cart( {state.generatedCodes.length} )
          </Link>
        </Menu.Item>
      </Menu>
      {/* </div> */}
    </Header>
  );
};

export default HeaderComponent;
