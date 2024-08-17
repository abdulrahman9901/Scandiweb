import React from "react";
import classNames from "classnames";

const Header =  ({
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
        {leftBtnName === "ADD" ? (
          <a name={leftBtnName} href={ahref}>
            <button className={"leftBtn"} onClick={leftBtnAction}>
              {leftBtnName}
            </button>
          </a>
        ) : (
          <button className={"leftBtn"} onClick={leftBtnAction}>
            {leftBtnName}
          </button>
        )}
        {rightBtnName === "MASS DELETE" ? (
          // <form onSubmit={(e)=>rightBtnAction(e)}>
          //   <button className="rightBtn" id="delete-product-btn" type="submit">
          //     {rightBtnName}
          //   </button>
          // </form>
          <input
            type="submit"
            className="rightBtn"
            id="delete-product-btn"
            value="MASS DELETE"
            name="MASS DELETE"
            onClick={rightBtnAction}
          />
        ) : (
          <button className="Cancel" id="cancel-btn" onClick={rightBtnAction}>
            {rightBtnName}
          </button>
        )}
        {/* <button
          className={classNames({
            cancelBtn: rightBtnName === "Cancel",
            rightBtn: rightBtnName === "MASS DELETE",
          })}
          id={`${
            rightBtnName === "MASS DELETE" ? "delete-product-btn" : "cancel-btn"
          }`}
          onClick={rightBtnAction}
        >
          {rightBtnName}
        </button> */}
      </div>
    </header>
  );
};

export default Header;
