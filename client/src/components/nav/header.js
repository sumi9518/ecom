import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';   //curly braces used to destructure as link could be dependent
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;                                      // Menu.Submenu, menu.item

const Header = () => {                                          //Funtional component

    const [current, setCurrent] = useState("Home");            //This way setting in function component & class component is different

    let dispatch = useDispatch();
    let history = useHistory();
    let { user } = useSelector((state) => ({ ...state }));                  // use Selector is used to get state

    const handleClick = (e) => {                                   //on click event e will be catched in function
        setCurrent(e.key);
    };

    const Logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "Logout",
            payload: null,

        });

        history.push("/login");
    }

    return (
        <div>

            <Menu key="Menu" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key="Home" icon={<HomeOutlined />} >
                    <Link to="/">Home</Link>
                </Item>
                {
                    !user && (
                        <Item key="Registered" icon={<UserAddOutlined />} className="float-right">
                            <Link to="/Register">Registered</Link>
                        </Item>
                    )
                }

                {
                    !user && (
                        <Item key="Login" icon={<UserOutlined />} className="float-right">
                            <Link to="/Login">Login</Link>
                        </Item>
                    )
                }
                {
                    user && (
                        <SubMenu key="userdata" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} >
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
                            <Item key="logout" icon={<LoginOutlined />} onClick={Logout}>Logout</Item>
                        </SubMenu>
                    )
                }


            </Menu>
        </div>

    );
};
export default Header;