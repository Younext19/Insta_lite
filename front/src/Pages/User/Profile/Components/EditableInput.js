import React, { useState } from "react";
import "./EditableInput.css"; // Import the CSS file
import CustomButton from "../../../../components/Button/CustomButton";

const EditableInput = ({ initialValue, editableLabel }) => {
  const [value, setValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // You can add logic here to save the edited value to your data store
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <p className="labelTitle">{editableLabel}</p>
      <div className="editableInput">
        <div className="titleBlock">
          {editMode ? (
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              onBlur={handleSaveClick} // Save on blur for simplicity
              placeholder="Enter a title..."
              className="inputTitle"
            />
          ) : (
            <span>{initialValue}</span>
          )}
        </div>
        <div className="buttonContainer">
          {editMode ? (
            <CustomButton
              text={"Enregistrer"}
              onClick={handleSaveClick}
              backgroundColor={"#7EDD93"}
            />
          ) : (
            <CustomButton text={"Modifier"} onClick={handleEditClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default EditableInput;
