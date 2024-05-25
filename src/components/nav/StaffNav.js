import React, {useState, useEffect} from "react";
import {Menu, Layout} from "antd";

import {useWindowWidth} from "@react-hook/window-size";
import {
    ProfileTwoTone,
    UserSwitchOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const {Sider} = Layout;

const StaffNav = () => {
    // state
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState("");
    // hooks
    const onlyWidth = useWindowWidth();

    useEffect(() => {
        setCurrent(window.location.pathname);
    }, [window.location.pathname]);

    useEffect(() => {
        if (onlyWidth < 800) {
            setCollapsed(true);
        } else if (onlyWidth > 800) {
            setCollapsed(false);
        }
    }, [onlyWidth < 800]);

    const activeName = (name) => `${current === name && "active"}`;

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
        >
            <Menu
                // defaultSelectedKeys={["1"]}
                defaultOpenKeys={["2", "6", "10"]}
                mode="inline"
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="1" icon={<ProfileTwoTone/>}>
                    <Link to="/staff/home">
                        <a  className={activeName("/staff/home")}>Staff Profie</a>
                    </Link>
                </Menu.Item>
                {}
                <Menu.Item key="2" icon={<UserSwitchOutlined/>}>
                    <Link to="/staff/list">
                        <a className={activeName("/staff/list")}>Staff List</a>
                    </Link>
                </Menu.Item>


            </Menu>
        </Sider>
    );
};

export default StaffNav;