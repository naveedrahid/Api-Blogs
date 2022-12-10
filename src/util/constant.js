export const authenticatedRoutesConstant = {
  Home: "/",
  User: "/users",
  addUser:'/users/add',
  editUser:'/users/edit/:id',
  Categories: "/categories",
  AddCategory: "/categories/add",
  EditCategory: "/categories/edit/:id",
  Comments: "/comments",
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

export const FooterText = "Squadcodersdev 2022";