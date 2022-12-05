import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Container/Login/Login';
import Register from '../Container/Register/Register';
import { unAuthenticatedRoutesConstant } from '../util/constant';

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route index path={unAuthenticatedRoutesConstant.Login} element={<Login />} />
      <Route
        path={unAuthenticatedRoutesConstant.Register}
        element={<Register />}
      />
    </Routes>
  );
}

export default UnAuthenticatedRoutes;
