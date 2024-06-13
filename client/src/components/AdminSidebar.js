import React, { memo, Fragment } from "react";
import { adminSidebar } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const activedStyle = "px-4 py-2 flex items-center gap-2 text-sm bg-blue-500";
const notActivedStyle =
  "px-4 py-2 flex items-center gap-2 text-sm hover:bg-blue-100";

const AdminSidebar = () => {
  return (
    <div className="py-4 bg-white h-full">
      <div className="flex flex-col justify-center items-center gap-2 p-4">
        <span className="text-3xl">Admin Workpace</span>
      </div>
      <div>
        {adminSidebar.map((el) => (
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

export default memo(AdminSidebar);
