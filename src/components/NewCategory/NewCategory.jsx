import React from "react";
import "./NewCategory.css";

// const tg = window.Telegram.WebApp;
// const defaultUserId = 558969327;

function NewCategory({title}) {
  return (
    <>
      <div className="new_category">
        {title}
      </div>
    </>
  );
}

export default NewCategory;
