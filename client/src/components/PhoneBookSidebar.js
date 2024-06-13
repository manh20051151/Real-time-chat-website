import React, { memo, Fragment } from "react";
import { adminSidebar, phoneBookSidebar } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const activedStyle = "px-4 py-2 flex items-center gap-2 text-sm bg-blue-500";
const notActivedStyle =
  "px-4 py-2 flex items-center gap-2 text-sm hover:bg-blue-100";

const PhoneBookSidebar = () => {
  return (
    <div className="py-4 bg-white h-full">
      <div>
        {phoneBookSidebar.map((el) => (
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

export default memo(PhoneBookSidebar);
