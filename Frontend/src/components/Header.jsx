import React from "react";
import classNames from "classnames";

const Header = ({
  title,
  leftBtnAction,
  leftBtnName,
  rightBtnAction,
  rightBtnName,
}) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="btn-container">
        <button className={"leftBtn"} onClick={leftBtnAction}>
          {leftBtnName}
        </button>
        <button
          className={classNames({
            cancelBtn: rightBtnName === "Cancel",
            rightBtn: rightBtnName === "MASS DELETE",
          })}
          onClick={rightBtnAction}
        >
          {rightBtnName}
        </button>
      </div>
    </header>
  );
};

export default Header;
