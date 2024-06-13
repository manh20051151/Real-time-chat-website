import React, { useEffect, useState } from "react";
import { getCurrent } from "../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";
import Swal from "sweetalert2";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  // const [currentUser, setCurrentUser] = useState(current)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(getCurrent());
      }
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (mes) {
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage);
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [mes]);

  return (
    <div>
      Header
      <br />
      {isLoggedIn && current ? (
        <small>
          <span>{`welcome, ${current?.name} , email: ${current?.username}`}</span>
          <br />
          <div
            onClick={() => {
              dispatch(logout());
              navigate(`/${path.LOGIN}`);
            }}
            className="bg-red-500 w-20 hover:rounded-full hover:cursor-pointer"
          >
            Đăng xuất
          </div>
        </small>
      ) : (
        <span>User</span>
      )}
    </div>
  );
};

export default Header;
