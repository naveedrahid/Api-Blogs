import React from "react";
import { Route, Routes } from 'react-router-dom';
import Categories from "../Container/Categories/Categories";
import CustomComment from "../Container/CustomComment/CustomComment";
import Users from "../Container/Users/Users";
import CustomLayout from "../customLayout/customLayout";
import { authenticatedRoutesConstant } from "../util/constant";


function AuthenticatedRoutes() {
    return (
        <Routes>
            <Route path={authenticatedRoutesConstant.Home} element={<CustomLayout />}>
                <Route
                    path={authenticatedRoutesConstant.Categories}
                    element={<Categories />}
                />
                <Route path={authenticatedRoutesConstant.User} element={<Users />} />
                <Route
                    path={authenticatedRoutesConstant.Comments}
                    element={<CustomComment />}
                />
            </Route>
        </Routes>
    );
}

export default AuthenticatedRoutes;
