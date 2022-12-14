import React from "react";
import "./DetailsItem.css";

function DetailsItem({ label, value, onChange }) {
  return (
    <>
      <div className="preference-details-item">
        <div className="item-label">{label}</div>
        <input
          className="item-input"
          type="number"
          id={label}
          name={label}
          defaultValue={value}
          onChange={onChange}
          min="0"
        />
      </div>
    </>
  );
}

export default DetailsItem;
