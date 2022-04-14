import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { Layout, Menu } from 'antd';
import {HomeOutlined, FormOutlined, IdcardOutlined, KeyOutlined} from '@ant-design/icons';

const { Header } = Layout;



export function LayoutComponent() {
    const { user } = useContext(AuthContext);

    return (
        <div>
        
        <Header className="header">
        <nav>
                <Menu mode="horizontal" theme="dark">
                {user ? (
                    <>
                    <Menu.Item  key="1"><a className="menuItem" href="/" target="_self" rel="noreferrer"> <HomeOutlined /> HOME</a></Menu.Item>
                    {user.role === "donor" &&
                    <Menu.Item className="menuItem" key="2"><a href="/profile"  target="_self" rel="noreferrer"><IdcardOutlined /> PROFILE</a></Menu.Item>}
                    </>
                    ) : (
                    <>
                    <Menu.Item className="menuItem" key="3"><a className="menuItem" href="/login" target="_self" rel="noreferrer"> <KeyOutlined /> LOGIN</a></Menu.Item>
                    <Menu.Item className="menuItem" key="4"><a href="/signup"  target="_self" rel="noreferrer"><FormOutlined /> SIGNUP</a></Menu.Item>
                    </>
                )}
                </Menu>
                </nav>
        </Header>

        
            
        <Outlet />
        </div>
    )
}