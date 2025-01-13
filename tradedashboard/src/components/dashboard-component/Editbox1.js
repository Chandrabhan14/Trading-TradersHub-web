import React, { useState } from "react";
import { createPersonalBot } from "../../services/UserServices";
const Editbox1 = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState({
    welcome_alert: isChecked,
    channel_id: "",
    message: "",
    social_alert: isChecked2,
    youtube_link: "",
    twitter_link: "",
    insta_link: "",
    server_id: "",
  });

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setData({ ...data, ["welcome_alert"]: !data.welcome });
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
    setData({ ...data, ["social_alert"]: !data.socialAlert });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsModalOpen(true); // Show the modal when the "Save" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleSubmit = async () => {
    try {
      const response = await createPersonalBot(data);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
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
        id="Bot_ThPersonal_Bot"
        tabIndex="-1"
        aria-labelledby="Bot_ThPersonal_BotLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="Bot_ThPersonal_BotLabel">
                Th-Personal-Bot
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
                <label for="">Welcome:</label>
                <label className={`switch ${isChecked ? "on" : "off"}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                  {isChecked && <span className="toggle-label on">On</span>}
                  {!isChecked && <span className="toggle-label off">Off</span>}
                </label>
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Channel ID:</label>
                <input
                  name="channel_id"
                  onChange={(e) => handleChange(e)}
                  className="form-control "
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Server ID:</label>
                <input
                  name="server_id"
                  onChange={(e) => handleChange(e)}
                  className="form-control "
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Message:</label>
                <textarea
                  name="message"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for=""> Social Alerts:</label>
                <label className={`switch ${isChecked2 ? "on" : "off"}`}>
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleToggle2}
                  />
                  <span className="slider"></span>
                  {isChecked2 && <span className="toggle-label on">On</span>}
                  {!isChecked2 && <span className="toggle-label off">Off</span>}
                </label>
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Instagram Link:</label>
                <input
                  name="insta_link"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group d-flex align-items-center justify-content-between">
                <label for="">Youtube:</label>
                <input
                  name="youtube_link"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>

              <div className="form-group mb-0 d-flex align-items-center justify-content-between">
                <label for="">Twitter:</label>
                <input
                  name="twitter_link"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="ex1"
                  type="text"
                />
              </div>
              <div style={{ clear: "both" }}></div>
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
                Save
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
                  data-target="#Bot_ThPersonal_Bot"
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

export default Editbox1;
