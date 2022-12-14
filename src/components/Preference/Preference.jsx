import React from "react";
import Button from "../Button/Button";
import "./Preference.css";

function Preference({ preference, onDetails, onEdit, onDelete }) {
  return (
    <>
      <div className="filter">
      <Button
          title={preference.categoryName}
          onClick={() => onDetails(preference)}
          className={"filter_detail_button"}
        />
        <Button
          title={"Edit"}
          onClick={() => onEdit(preference)}
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
