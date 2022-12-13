import React from "react";
import Button from "../Button/Button";
import "./Preference.css";

function Preference({ preference, onDelete }) {
  let desc = "" + preference.categoryId;
  return (
    <>
      <div className="filter">
        <p>{desc}</p>
        <Button
          title={"Edit"}
          onClick={() => onDelete(preference)}
          className={"filter_edit_button"}
        />
        <Button
          title={"X"}
          onClick={() => onDelete(preference)}
          className={"filter_delete_button"}
        />        
      </div>
    </>
  );
}

export default Preference;
