import React from "react";
import "./Button.css";

function Button({ title, onClick, image, className }) {
  
  let cln = className ? "btn " + className : "btn";

  return (
    <button className={cln} onClick={onClick}>
      { !image ? title : <img src={image} alt={title} />}
    </button>
  );
}

export default Button;
