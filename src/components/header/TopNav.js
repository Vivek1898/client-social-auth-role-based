import {Menu} from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import {logoutUser } from "../../redux/thunk/UserThunk";
import {resetUser} from "../../redux/slices/UserSlice";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

const {SubMenu} = Menu;
const TopNav = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const [current, setCurrent] = useState("mail");

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const signOut = async () => {
         dispatch(resetUser());
         localStorage.removeItem('user');
            localStorage.removeItem('token');
        navigate("/login");
        return null;

    };

    const roleBasedLink = () => {
        if (user?.roleId === 1) return "/staff/home";
        if (user?.roleId === 0) return "/staff/home";
        return "/staff/home";
    }

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="mail" icon={<AppstoreOutlined/>}>
                <Link to="/">
                    <a>Oauth Profiles</a>
                </Link>
            </Menu.Item>

            {user === null && (
                <>
                    <Menu.Item
                        style={{marginLeft: "auto"}}
                        key="signup"
                        icon={<UserAddOutlined/>}
                    >
                        <Link to="/register">
                            <a>Signup</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="signin" icon={<UserOutlined/>}>
                        <Link to="/login">
                            <a>Signin</a>
                        </Link>
                    </Menu.Item>
                </>
            )}

            {user !== null && (
                <>
                    <SubMenu
                        key="SubMenu"
                        icon={<SettingOutlined/>}
                        title={user?.displayName || "Dashboard"}
                        style={{marginLeft: "auto"}}
                    >
                        <Menu.ItemGroup title="Management">
                            <Menu.Item key="setting:2">
                                <Link to={roleBasedLink()}>
                                    <a>Dashboard</a>
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                    <Menu.Item
                        onClick={() => signOut()}
                        key="signout"
                        icon={<LogoutOutlined/>}
                    >
                        <a>Sign out</a>
                    </Menu.Item>
                </>
            )}

        </Menu>

    )
};

export default TopNav;