import React, { memo, Fragment } from "react";
import { memberSidebar } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import avatar from "../assets/anhtam.png";

const activedStyle = "px-4 py-2 flex items-center gap-2 text-sm bg-blue-500";
const notActivedStyle =
  "px-4 py-2 flex items-center gap-2 text-sm hover:bg-blue-100";

const MemberSidebar = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="py-4 bg-white h-full w-[250px] flex-none">
      <div className="flex flex-col w-full items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover"
        />
        <small> {`${current.name}`} </small>
      </div>
      <div>
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
                to={el.path}
              >
                <span> {el.icon} </span>
                <span> {el.text} </span>
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
