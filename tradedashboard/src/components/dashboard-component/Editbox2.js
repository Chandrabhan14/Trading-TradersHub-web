import React, { useState } from "react";
import ModalComponent from "../modal/popup/ModalComponent";
import axios from "axios";


const Editbox2 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = {
    channelId: "your_channel_id", // Replace with the actual value from your input field
    hotStocks: isChecked,
    hotStocksInterval: "option", // Replace with the selected interval value from the dropdown
    insideBuyers: isChecked2,
    insideBuyersInterval: "option2", // Replace with the selected interval value from the dropdown
    heatMap: isChecked3,
    haltUpDown: isChecked4,
  };
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleToggle3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleToggle4 = () => {
    setIsChecked4(!isChecked4);
  };
  const handleSave = () => {
    // ... (previous code remains unchanged) ...
    setIsModalOpen(true); // Show the modal when the "Save" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleSubmit = () => {
    axios
      .post("your_backend_url", data)
      .then((response) => {
        console.log("Data successfully saved:", response.data);
        setIsModalOpen(false); // Close the modal after successfully saving data
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };
  const customStyles = {
    modalOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Custom background color for the modal overlay
    },
    modalContent: {
      maxWidth: "500px", // Custom maximum width for the modal content
    },
    modalClose: {
      color: "red", // Custom color for the modal close button
    },
  };

  return (
    <div>
      <div
        className="modal fade Bot_TradersHub_ninja"
        data-backdrop="static"
        id="Bot_TradersHub_ninja"
        tabIndex="-1"
        aria-labelledby="Bot_TradersHub_ninjaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="Bot_TradersHub_ninjaLabel">
                TradersHub.ninja
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="text-white">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Channel Id:</label>
                <input
                  type="text"
                  name=""
                  id="ex1"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>
              {/* <div style={{ clear: "both" }}></div> */}

              <div className="form-group mt-3">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <label for="">Hot Stocks:</label>
                  <label className={`switch ${isChecked ? "on" : "off"}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                    <span className="slider"></span>
                    {isChecked && <span className="toggle-label on">On</span>}
                    {!isChecked && (
                      <span className="toggle-label off">Off</span>
                    )}
                  </label>
                </div>
                <select className="form-select form-control">
                  <option value="option"> 5 min </option>
                  <option value="option"> 10 min </option>
                  <option value="option"> 30 min </option>
                  <option value="option"> 1 hr </option>
                  <option value="option"> 4 hr </option>
                </select>
              </div>
              {/* <div style={{ clear: "both" }}></div> */}

              <div className="form-group mt-3">
                <div className="d-flex align-items-center justify-content-between w-100 pt-3">
                  <label for=""> Inside Buyers:</label>
                  <label className={`switch ${isChecked2 ? "on" : "off"}`}>
                    <input
                      type="checkbox"
                      checked={isChecked2}
                      onChange={handleToggle2}
                    />
                    <span className="slider"></span>
                    {isChecked2 && <span className="toggle-label on">On</span>}
                    {!isChecked2 && (
                      <span className="toggle-label off">Off</span>
                    )}
                  </label>
                </div>
                <select className="form-select form-control">
                  <option value="option2"> 9.30 AM EST </option>
                  <option value="option2"> 4.30 AM EST </option>
                </select>
              </div>
              {/* <div style={{ clear: "both" }}></div> */}

              <div className="form-group mt-3">
                <div className="d-flex align-items-center justify-content-between w-100 pt-3 mt-3">
                  <label for=""> Heat Map:</label>
                  <label className={`switch ${isChecked3 ? "on" : "off"}`}>
                    <input
                      type="checkbox"
                      checked={isChecked3}
                      onChange={handleToggle3}
                    />
                    <span className="slider"></span>
                    {isChecked3 && <span className="toggle-label on">On</span>}
                    {!isChecked3 && (
                      <span className="toggle-label off">Off</span>
                    )}
                  </label>
                </div>
              </div>
              {/* <div style={{ clear: "both" }}></div> */}

              <div className="form-group mb-0">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <label for="">Halt Up & Down:</label>
                  <label className={`switch ${isChecked4 ? "on" : "off"}`}>
                    <input
                      type="checkbox"
                      checked={isChecked4}
                      onChange={handleToggle4}
                    />
                    <span className="slider"></span>
                    {isChecked4 && <span className="toggle-label on">On</span>}
                    {!isChecked4 && (
                      <span className="toggle-label off">Off</span>
                    )}
                  </label>
                </div>
              </div>

             
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#EditBot_ConfirmSave_modal"
                data-dismiss="modal"
                aria-label="Close"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade EditBot_ConfirmSave_modal"
        data-backdrop="static"
        id="EditBot_ConfirmSave_modal"
        tabIndex="-1"
        aria-labelledby="EditBot_ConfirmSave_modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h3 className="font-weight-boldser">Confirm Save</h3>
              <p> Are you sure you want to save the changes? </p>
              <div className="d-flex flex-row justify-content-between mt-4">
                <button
                  className="btn btn_main_hp"
                  style={{ borderRadius: "10%" }}
                  onClick={handleSubmit}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
                <button
                  className="btn btn_main_hp"
                  data-toggle="modal"
                  data-target="#Bot_TradersHub_ninja"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Editbox2;
