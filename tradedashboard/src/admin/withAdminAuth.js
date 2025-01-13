import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const WithAdminAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    if (user?.is_admin === false) {
      window.location.href = "*";
      return null;
    }

    

    const currentDate = moment().tz("America/New_York");

    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

   
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAdminAuth;
