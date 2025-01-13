import React from "react";


const ToggleButton = ({ enabled, onChange }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={enabled} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleButton;
