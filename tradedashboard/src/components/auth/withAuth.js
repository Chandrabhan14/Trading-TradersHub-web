import React from 'react';
import { useAuth } from './useAuth';
import moment from 'moment';

const WithAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
  //  const { user } = useAuth();
    const user = JSON.parse(localStorage.getItem("user") || "{}");


    if (!user) {
      // If user is not logged in, redirect to the login page
      window.location.href = "/";
      return null;
    }

    

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    // if (currentDate.isAfter(planEndDate)) {
    //   // If user's subscription has expired, redirect to the watchlist page
    //   // window.location.href = "/watchlist";
    //   return null;
    // }

    // If user is logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
