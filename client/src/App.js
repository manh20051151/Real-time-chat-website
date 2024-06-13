import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  FinalRegister,
  ResetPassword,
  Phonebook,
  HomeLayout,
} from "./pages/public";
import path from "./ultils/path";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemberLayout, Personal } from "./pages/member";
import { AdminLayout, Dashboard, ManageUser } from "./pages/admin";
import { AddFriend, ListFriend } from "./pages/phoneBook.js";
function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.HOME} element={<Home />}>
            <Route path={path.PHONEBOOK} element={<Phonebook />}>
              <Route path={path.ADDFRIEND} element={<AddFriend />} />
              <Route path={path.LISTFRIEND} element={<ListFriend />} />
            </Route>
            <Route path={path.HOMELAYOUT} element={<HomeLayout />} />
          </Route>
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
