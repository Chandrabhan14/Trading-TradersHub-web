import React, { useState, useEffect } from "react";
import { TfiAngleDown } from "react-icons/tfi";

import thl3 from "../../../assets/img/logo/thl3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import "./navBottom.css";

import { useNavigate } from "react-router-dom";
import Side from "../../sidebar/side";
import { getHolidaysandtradinghours } from "../../../services/DashboardServices";
import StockMarketButton from "./StockMarketButton";

import TickerBar from "../../TickerBar/TickerBar";

import { globalSearch } from "../../../services/UserServices";
import Autosuggest from 'react-autosuggest';

const NavBottom = ({ isStyleChanged = false }) => {
  const location = useLocation();

  const [searchingValue, setSearchingValue] = useState("");
  const navigate = useNavigate();
  const [holidaysand, setHolidaysand] = useState();


  const [showInput, setShowInput] = useState(false);
 
  const [suggestions, setSuggestions] = useState([]);



  const user = localStorage.getItem('user');
  // Function to retrieve user data from local storage


  // useEffect hook to run once when the component mounts
  useEffect(() => {
    const getUserFromLocalStorage = () => {

      return user;

    };
    getUserFromLocalStorage();
  }, [user]);



  const handleChange = (e) => {
    setSearchingValue(e.target.value?.toUpperCase());
  };

  const handleLogout = () => {
    // Clear user data from localStorage and any other necessary cleanup
    localStorage.clear();


    // Use window.history.replaceState to remove the cached page from history
    const newState = { ...window.history.state, key: null };
    window.history.replaceState(newState, "", "/");

    // Redirect to the login page
    window.location.href = "/login";
  };

  const hiddenPaths = ["/watchlist", "/todays-market", "/bot", "/indicator",
    "/paper-trading", "/subscription", "/DailyLevel", "/education", "/settings", "/connect-us", "/DailyLevel", "/MyFav" ,"/OptionsWorld","/MakePrediction"];

  const fetchHolidayData = async () => {
    try {
      const response = await getHolidaysandtradinghours();
      if (response.status == 200) {
        const res = response?.data?.data;
        setHolidaysand(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchHolidayData();
  }, []);

  const handleSearch = () => {
    // Do something with the search value, e.g., navigate to the search page
    if (searchingValue) {
      window.location.href = `/search/${searchingValue.toUpperCase()}`;

    } else {
      setShowInput(!showInput)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };



  const handleSuggestionsFetchRequested = async (searchingValue) => {
    try {
      const response = await globalSearch(searchingValue); 
      const data = response.data.data; 
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };



  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
 
  }, []);

  const handleSuggestionSelected = (event, { suggestion }) => {

    console.log(suggestion)
   
    window.location.href=(`/search/${suggestion.ticker}`);
  };
  return (
    <div className="topbar_section_hp">
      <div className="overlay"></div>

      <header className="bg-color header-dashboard-top Header_section_hp">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light header-menu-area header-area">
          <div className="logo navbar-brand">
            <Link to="/todays-market" className="link">
              <img src={thl3} alt="" width="120px" />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </button>

          <div className={`collapse navbar-collapse ${user ? "" : "befor_loging_search_box_section"}`} id="navbarTogglerDemo02">
          

            <div className="header_menu">
              <ul className="main-menu navbar-nav mr-auto  mt-2 mt-lg-0">



                {user ? (
                  <>
                    <li className="nav-item  ">
                      {holidaysand?.stockMarketHours && (
                        <StockMarketButton
                          marketHours={holidaysand?.stockMarketHours}
                          holidays={holidaysand}
                        />
                      )}
                    </li>
                    <li className={`nav-item  ${showInput ? "nav-search-option " : ""}`}>
                      {showInput ? (
                        <>
                         <div className="input_suggest_area_hp">
                         <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested(value)}
                            getSuggestionValue={(suggestion) => suggestion.company_name} // Use company name for suggestion value
                            renderSuggestion={(suggestion) => (
                         
                              <div>
                            
                               {suggestion.company_name} ({suggestion.ticker}) 
                              </div>
                            )}
                            inputProps={{
                              placeholder: 'Stock Searches.....',
                              value: searchingValue?.trim() || '',
                              onChange: handleChange,
                              onKeyDown: handleKeyDown
                            }}
                            onSuggestionSelected={handleSuggestionSelected}
                          />
                          </div>
                          <a onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </a>
                        </>
                      ) : (
                        <div className="nav_search_toggle_btn">
                          <a onClick={() => setShowInput(!showInput)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </a>
                        </div>
                      )}
                    </li>
                  </>
                ) : (
                  <li className={`nav-item  nav-search-option `}>

                    <div className="befor_loging_search_inputBox_area">
                      <div className="harshit">
                        <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={({ value }) => handleSuggestionsFetchRequested(value)}
                        getSuggestionValue={(suggestion) => suggestion.company_name} // Use company name for suggestion value
                        renderSuggestion={(suggestion) => (
                          <div>
                 
                            {suggestion.company_name} ({suggestion.ticker})
                          </div>
                        )}
                        inputProps={{
                          placeholder: 'Stock Searches.....',
                          value: searchingValue?.trim() || '',
                          onChange: handleChange,
                          onKeyDown: handleKeyDown
                        }}
                        onSuggestionSelected={handleSuggestionSelected} // Call handleSuggestionSelected when a suggestion is selected
                       />
                      </div>
                      <a onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                    </div>

                  </li>
                )}



                {user && (
                  <>

                    {!hiddenPaths.includes(location.pathname) && (
                      <li className="nav-item menu-item-has-children">
                        <Link to="/watchlist" className="link">
                          WatchList
                        </Link>
                      </li>
                    )}
                    <li className="nav-item contact">
                      <Link to="/MainDashboard" className="link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item menu-item-has-children">
                      <Link to="" className="link">
                        TH HUB <TfiAngleDown />
                      </Link>
                      <ul className="submenu ">
                        <li>
                          <Link to="/chart" className="link">
                            Chart
                          </Link>
                        </li>
             
                        <li>
                          <Link to="/Robinhood" className="link">
                            Journals
                          </Link>
                        </li>
                        <li>
                          <Link to="/stock-scanner" className="link">
                            Stock Scanner
                          </Link>
                        </li>
                        <li>
                        <Link to="/short-interest" className="link">
                            Short Interest
                          </Link>
                        </li>
                        <li>
                        <Link to="/ThBot" className="link">
                            Th Bot
                          </Link>
                        </li>
                        <li>
                        <Link to="/Long-term" className="link">
                            Long Term
                          </Link>
                        </li>


                        
                        
                      </ul>
                    </li>
                    <li className="nav-item menu-item-has-children ">
                      <Link to="/calendar" className="link">
                        Calendar
                      </Link>
                    </li>
                    <li className="nav-item menu-item-has-children">
                      <Link to="" className="link">
                        News <TfiAngleDown />
                      </Link>
                      <ul className="submenu">
                        <li>
                          <Link to="/news/stock" className="link">
                            Stocks
                          </Link>
                        </li>
                        <li>
                          <Link to="/news/general" className="link">
                            General
                          </Link>
                        </li>
                        <li>
                          <Link to="/news/crypto" className="link">
                            Cryptocurrency
                          </Link>
                        </li>
                        <li>
                          <Link to="/news/forex" className="link">
                            Forex News
                          </Link>
                        </li>
                        <li>
                          <Link to="/news/small_cap_news" className="link">
                            Small Cap
                          </Link>
                        </li>
                      </ul>
                    </li>

                    
         
                    <li className="nav-item">
                      <Link to="" className="link" onClick={handleLogout}>
                        Logout{"  "}
                        <i className="fa-solid fa-arrow-right-from-bracket logout logout_icon ml-2"></i>
                      </Link>{" "}
                    </li>
                  </>
                )}

              </ul>
               
              <div className="side_menu_MobileView">
                <Side />
              </div>
            </div>
          </div>
        </nav>
      </header>



      <TickerBar />



     
    </div>
  );
};

export default NavBottom;
