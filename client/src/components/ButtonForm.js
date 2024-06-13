import React, { memo } from "react";

const ButtonForm = ({
  children,
  handleOnClick,
  style,
  fw,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-sky-400 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default memo(ButtonForm);
