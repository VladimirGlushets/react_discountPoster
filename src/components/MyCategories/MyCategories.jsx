import React from "react";
import "./MyCategories.css";

// const tg = window.Telegram.WebApp;
// const defaultUserId = 558969327;

function MyCategories({title}) {
  return (
    <>
      <div className="my_categories">
        {title}
      </div>
    </>
  );
}

export default MyCategories;
