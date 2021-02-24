import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"; //for making links on nav active

import {
  HomeOutlined,
  IdcardOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import firebase from "firebase"; //required to implement LOGOUT
import { useDispatch, useSelector } from "react-redux";

//to access history need hook
import { useHistory } from "react-router-dom";

const { SubMenu, Item, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home"); //home will be default state

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (event) => {
    //
    //console.log(event.key); to see what option is being sent to console
    setCurrent(event.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  //icons can be found at https://ant.design/components/icon/
  //use {user/!user && (...)} to conditionally display menu items
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<IdcardOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          <ItemGroup title="Options">
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
