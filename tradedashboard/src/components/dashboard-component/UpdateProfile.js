import React, { useEffect, useState } from "react";
import dummyProfile from "../../assets/img/logo/dummy-profile.png";
import { getUserData } from "../../services/UserServices";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import ToggleButton from "../../utils/Toggle";
import { setUser } from "../store/Reducers";

const UpdateProfile = () => {
  const [uid, setUid] = useState("");
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: null,
    uid: uid,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [enablePhoneNumber, setEnablePhoneNumber] = useState(false);

  const userGetData = async (uid) => {
    try {
      setLoading(true);
      const response = await getUserData(uid);
      setFormData({
        ...formData,
        username: response.data.username,
        email: response.data.email,
        password: response.data.password,
        phoneNumber: response.data.phoneNumber,
        image: response.data.profile_pic,
      });

      setUrl(response.data.profile_pic);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setUrl(URL.createObjectURL(files[0]));
    }
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });

    if (name === "phoneNumber") {
      localStorage.setItem("phoneNumber", value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (enablePhoneNumber && !formData.phoneNumber) {
      Swal.fire({
        text: "Please provide a phone number for Two Factor Authentication.",
        icon: "warning",
      });
      return; // Stop form submission if phone number is not provided
    }
    let payload;
    let headers;


      // Create the JSON object if 2FA is enabled
      payload = {
        uid: uid,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile_pic: formData.image, // Assuming image is a URL here
        is_2fa_enabled: true,
        phone_number: +formData.phoneNumber,
      };
      headers = {
        "Content-Type": "application/json",
      }

    try {
      dispatch(setUser({ ...formData, profile_pic: url }));

      const response = await axios.patch(
        `https://api.tradershub.ninja/api/update_profile?uid=${uid}`,
        payload,
        { headers }
      );

      if (response.status === 200) {
        Swal.fire({
          text: "Your profile updated successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        text: "An error occurred while updating your profile",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userData = JSON.parse(dataString);

    if (userData) {
      setUid(userData.uid);
      setFormData((prevData) => ({
        ...prevData,
        uid: userData.uid,
      }));

      if (userData.uid) {
        userGetData(userData.uid);
      }
    }

    // Retrieve toggle state and phone number from localStorage
    const storedEnablePhoneNumber = localStorage.getItem("enablePhoneNumber") === "true";
    const storedPhoneNumber = localStorage.getItem("phoneNumber");

    if (storedEnablePhoneNumber) {
      setEnablePhoneNumber(storedEnablePhoneNumber);
    }
    if (storedPhoneNumber) {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: storedPhoneNumber,
      }));
    }
  }, []);

  useEffect(() => {
    // Store the toggle state in localStorage whenever it changes
    localStorage.setItem("enablePhoneNumber", enablePhoneNumber);
  }, [enablePhoneNumber]);

  if (loading) {
    return (
      <div
        className="spinner-border text-center m-auto d-flex "
        style={{ width: "3rem", height: "3rem", color: "white" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="row justify-content-center update_profile-kj">
      <div className="col-md-12 col-lg-8 col-xl-6">
        <div className="profile-update-card">
          <h3 className="profile-title text-center">Update Your Profile</h3>
          <div className="profile-preview-kj mt-3">
            <div className="avatar-upload mt-3">
              <div className="avatar-edit">
                <input
                  id="imageUpload"
                  className="file-upload-input"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="avatar-preview">
                <img src={url ? url : dummyProfile} alt="Profile" />
              </div>
            </div>
          </div>
          <form className="d-flex flex-column mt-3" onSubmit={handleFormSubmit}>
            <label htmlFor="username">Username</label>
            <input
              className="form-control mb-3"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />

            <label htmlFor="email">Email</label>
            <input
              className="form-control mb-3"
              type="email"
              disabled
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />

            <label htmlFor="password">Password</label>
            <input
              className="form-control mb-3"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />

            <div className="form-group form-check">
              <ToggleButton
                enabled={enablePhoneNumber}
                onChange={() => setEnablePhoneNumber(!enablePhoneNumber)}
              />
              <label className="form-check-label" htmlFor="enablePhoneNumber">
                Enable Two Factor Authentication
              </label>
            </div>

            {enablePhoneNumber && (
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>
            )}

            <button
              className="py-2 slide-btn login-btn btn btn-block"
              type="submit"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
