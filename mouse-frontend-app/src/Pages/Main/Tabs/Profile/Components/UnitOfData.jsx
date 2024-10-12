import PropTypes from "prop-types";
import "./UnitOfData.css";
import React from "react";

export default function UnitOfData({ editMode, data, type, name, onChange }) {
  return (
    <>
      {editMode ? (
        <div>
          <input
            type={type}
            name={name}
            value={data}
            onChange={onChange}
            className="editModeInput"
          ></input>
        </div>
      ) : (
        <div className="editModeData">{data}</div>
      )}
    </>
  );
}

UnitOfData.propTypes = {
  editMode: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
