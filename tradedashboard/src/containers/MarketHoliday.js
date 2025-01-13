import React,{useEffect} from 'react'
import NavBottom from '../components/nav/NavBottom/NavBottom'
import useWebSocket from '../hooks/useWebsocket'
const MarketHoliday = () => {
  const { ws, messages, sendMessage } = useWebSocket();

  useEffect(() => {
    const interval = setInterval(() => {
      const dataString = localStorage.getItem("googledata");
      const userDataFromLocalStorage = JSON.parse(dataString);
      const uid = userDataFromLocalStorage?.uid;

      const message = {
        user: uid ? uid : "Anonymous",
        content: "Automatic message from WatchList component",
      };
      sendMessage(message);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [sendMessage]);

  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>
      
      <div className='news' style={{ height: "100%" }}>
        <div className="container mt-5" style={{ minWidth: "90%" }}>
          <div className="row justify-content-between">
            <div className="col-md-8">
              <div className="text-white py-4">
                <h5 style={{ color: "#FF3399",fontWeight:"800" }}>Market Holiday's</h5>
                <table className="table text-white mt-4 market-holidays-table">
                  <thead>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <th scope="col">Holiday</th>
                      <th scope="col">2023</th>
                      <th scope="col">2024</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>New Year's Day</td>
                      <td>January 1</td>
                      <td>January 1</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>Independence Day</td>
                      <td>July 4</td>
                      <td>July 4</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>Thanksgiving</td>
                      <td>November 23</td>
                      <td>November 28</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>Christmas Day</td>
                      <td>December 25</td>
                      <td>December 25</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>New Year's Day</td>
                      <td>January 1</td>
                      <td>January 1</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>Independence Day</td>
                      <td>July 4</td>
                      <td>July 4</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>Thanksgiving</td>
                      <td>November 23</td>
                      <td>November 28</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>Christmas Day</td>
                      <td>December 25</td>
                      <td>December 25</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>New Year's Day</td>
                      <td>January 1</td>
                      <td>January 1</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>Independence Day</td>
                      <td>July 4</td>
                      <td>July 4</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>Thanksgiving</td>
                      <td>November 23</td>
                      <td>November 28</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-white py-4">
                <h5 style={{ color: "#FF3399",fontWeight:"800" }}>Trading Day's</h5>
                <table className="table text-white mt-4 trading-day-table">
                  <tbody>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>January</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>February</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>March</td>
                      <td>23</td>
                      <td>62</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>April</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>May</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>June</td>
                      <td>23</td>
                      <td>63</td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>July</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>August</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>September</td>
                      <td>23</td>
                      <td>62</td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>October</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#020135" }}>
                      <td>November</td>
                      <td>23</td>
                      <td></td>
                    </tr>
                    <tr style={{ backgroundColor: "#150550" }}>
                      <td>December</td>
                      <td>23</td>
                      <td>63</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketHoliday