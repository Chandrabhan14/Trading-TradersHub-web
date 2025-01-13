import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useSetCookie = (name, value) => {
  useEffect(() => {
    
    Cookies.set(name, value, { expires: 7 }); 
  }, [name, value]);
};

export default useSetCookie;