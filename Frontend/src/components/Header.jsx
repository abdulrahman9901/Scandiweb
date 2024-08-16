import React from "react";
import classNames from "classnames";

const Header =  React.memo(({
  title,
  leftBtnAction,
  leftBtnName,
  rightBtnAction,
  rightBtnName,
  ahref = "#"
}) => {
  console.log("Header rendered"); // For debugging purposes

  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="btn-container">
        <a name={leftBtnName} href={ahref}>
          <button className={"leftBtn"} onClick={leftBtnAction}>
            {leftBtnName}
          </button>
        </a>
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
});

export default Header;
