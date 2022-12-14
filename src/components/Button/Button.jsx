import React from "react";
import "./Button.css";

function Button({ title, onClick, image, className, isDisabled }) {
  let cln = className ? "btn " + className : "btn";
  let disabled = isDisabled ? "disabled" : "";

  return (
    <button className={cln} onClick={onClick} disabled={disabled}>
      {!image ? title : <img src={image} alt={title} />}
    </button>
  );
}

export default Button;
