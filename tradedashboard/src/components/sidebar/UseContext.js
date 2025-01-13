import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserData } from '../../services/UserServices';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const googledataString = localStorage.getItem("googledata");

  const googledata = JSON.parse(googledataString);


  const [userData, setUserData] = useState({
    username: googledata?.username || '',
    email: googledata?.email || '',
    profilePic: googledata?.profile_pic || ''
  });

  const [loading, setLoading] = useState(false); // Initially set loading to false

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await getUserData(uid);
        setUserData({
          username: response.data?.username || '',
          email: response.data?.email || '',
          profilePic: response.data?.profile_pic || ''
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (googledata && !userData.username) {
      fetchUserData(googledata.uid);
    }
  }, [googledata, userData.username]);

  console.log("userData:", userData);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
