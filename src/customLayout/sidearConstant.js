import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { authenticatedRoutesConstant, unAuthenticatedRoutesConstant, userInfo } from "../util/constant";

const logoutClickHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem(userInfo.TOKEN);
    localStorage.removeItem(userInfo.USERNAME);
    window.location.href = unAuthenticatedRoutesConstant.Login;
}

export const sidebarItems = [
    {
        icon: <PieChartOutlined />,
        label: <Link to={authenticatedRoutesConstant.Categories}>Categories</Link>,
        key: "categories",
    },

    {
        icon: <UserOutlined />,
        label: <Link to={authenticatedRoutesConstant.User}>Users</Link>,
        key: "users",
    },
    {
        icon: <DesktopOutlined />,
        label: <Link to="/posts">Posts</Link>,
        key: "posts",
    },
    {
        icon: <FileOutlined />,
        label: <Link to="/comments">Comments</Link>,
        key: "comments",
    },
    {
        label: <div onClick={logoutClickHandler}>LogOut</div>,
        key: "logout",
        icon: <LogoutOutlined />,
    },
];
