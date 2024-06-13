import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import path from "../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/userSlice";
import avatar from "../assets/anhtam.png";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiContactsBook2Fill } from "react-icons/ri";
import { homeSidebar } from "../ultils/contants";
import clsx from "clsx";

const LeftSidebar = () => {
  const { current } = useSelector((state) => state.user);
  console.log("current current: ", current);
  const [isShowOption, setisShowOption] = useState(false);
  const dispatch = useDispatch();

  const ChatButton = () => {
    return (
      <div className="chat-button justify-center flex items-center mt-3">
        <IoChatboxEllipses className="text-[30px] text-white" />
      </div>
    );
  };
  const SettingButton = ({ children }) => {
    return <div className="setting-button">{children}</div>;
  };

  const ContactsButton = () => {
    return (
      <div className="contacts-button justify-center flex items-center">
        <RiContactsBook2Fill className="text-[30px] text-white" />
      </div>
    );
  };

  const Avatar = () => {
    return (
      <div className="flex justify-center pt-2">
        <div
          className="relative "
          onClick={() => setisShowOption((prev) => !prev)}
          id="profile"
        >
          <div className="avatar  mt-0 online">
            <div className="w-14 rounded-full">
              <img
                src={current?.avatar || avatar}
                alt="logo"
                className="w-16 h-16 object-cover"
              />
            </div>
          </div>
          {isShowOption && (
            <div className="fixed  top-1 z-50 flex-col flex left-16 bg-gray-200 border min-w-[200px] py-2">
              <Link
                className="p-2 w-full hover:bg-sky-100"
                to={`/${path.MEMBER}/${path.PERSONAL}`}
              >
                Personal
              </Link>

              {+current?.role === 1 && (
                <Link
                  className="p-2 w-full hover:bg-sky-100"
                  to={`/${path.ADMIN}/${path.DASHBOARD}`}
                >
                  Admin workspace
                </Link>
              )}
              <Link
                onClick={() => dispatch(logout())}
                to={`/${path.LOGIN}`}
                className="p-2 w-full hover:bg-sky-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  const activedStyle = "px-4 py-2 flex items-center gap-2 text-sm bg-blue-500";
  const notActivedStyle =
    "px-4 py-2 flex items-center gap-2 text-sm hover:bg-blue-100";
  return (
    <div className="left-sidebar h-full">
      <Avatar />
      <div className="pt-4">
        {homeSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
                to={el.path}
              >
                <span className="mt-2 mb-2"> {el.icon} </span>
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>

      <SettingButton>
        <img
          className="iconsetting"
          src={"https://www.svgrepo.com/show/500685/setting.svg"}
          alt=""
        />
      </SettingButton>
    </div>
  );
};

export default LeftSidebar;
