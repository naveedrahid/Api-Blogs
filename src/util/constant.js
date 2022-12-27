import { notification } from "antd";

export const authenticatedRoutesConstant = {
  Home: "/",
  User: "/users",
  addUser:'/users/add',
  editUser:'/users/edit/:id',
  Categories: "/",
  AddCategory: "/categories/add",
  EditCategory: "/categories/edit/:id",
  Comments: "/comments",
  Posts: "/posts",
  addPosts: "/posts/add",
  editPosts: "/posts/edit/:id",
};

//login,register
export const unAuthenticatedRoutesConstant = {
  Home: "/",
  Login: "/",
  Register: "/register",
};

export const userInfo = {
  TOKEN: "token",
  USERNAME: "username",
};
export const notificationMessage = (message)=>{
  notification.success({
      message: message,
      placement: "topRight",
      top:50,
  });
}

export const FooterText = "Squadcodersdev 2022";