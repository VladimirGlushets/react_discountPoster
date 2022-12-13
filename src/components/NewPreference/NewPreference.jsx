import React from "react";
import "./NewPreference.css";

// const tg = window.Telegram.WebApp;
// const defaultUserId = 558969327;

function NewPreference({title}) {
  return (
    <>
      <div className="new_category">
        {title}
      </div>
    </>
  );
}

export default NewPreference;
