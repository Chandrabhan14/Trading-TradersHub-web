import React, { useState, useEffect, useContext, createContext } from 'react';




const AuthContext = createContext({
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children })  {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin,setAdmin] = useState(false)

  useEffect(() => {
    const loginUser = localStorage.getItem('user');

    setIsLoading(true);

    if (loginUser) {
      // Parse the stored user data (assuming it's in JSON format)
      const parsedUser = loginUser ? JSON.parse(loginUser) : null;
      if(parsedUser){
        setAdmin(parsedUser?.is_admin == true ? true : false)
      }
      setUser(parsedUser);
    }

    setIsLoading(false);
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <AuthContext.Provider value={{ user,isAdmin }}>{children}</AuthContext.Provider>
  );
}
