import React from "react";
import "./NewPreference.css";

// const tg = window.Telegram.WebApp;
// const defaultUserId = 558969327;

function NewPreference({ title }) {
  return (
    <>
      <div className="new_category">
        <h1>{title}</h1>
      </div>
    </>
  );
}

export default NewPreference;
