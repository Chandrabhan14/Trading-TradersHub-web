import React,{useEffect} from "react";
import NavBottom from "../nav/NavBottom/NavBottom";
import image from "../../assets/img/journal/journel_ss.png"
import useWebSocket from "../../hooks/useWebsocket";

const Journal = () => {
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
    <div className="journal" style={{ background: '#150550', height: "100vh"}}>
        <NavBottom isStyleChanged />
      <div className="row" style={{paddingTop: "10%"}}>
          <div className="col-md-4 offset-2 text-muted">
              <div className="mb-2">
                <h4 >Trading Journal</h4>
                <p className="">Start recording your trades with TraderSync and let our<br/>powerful journaling show you the path to minimize your mistakes.</p>
              </div>
              <div className="pl-5">
                <div className="mb-5">
                  <p className="h6"><span className="font-weight-bold">Journal Trades</span><br/>
                  The simplest yet most powerful stock trading journal to date. Build a vault of valuable information that can be analyzed at any time from anywhere.
                  </p>
                </div>

                <div className="mb-5">
                  <p className="h6"><span className="font-weight-bold">Stop Losing Profits</span><br/>
                  Refine your performance by learning which setups are not working for you and focus on the ones that are.
                  </p>
                </div>

                <div className="mb-5">
                  <p className="h6"><span className="font-weight-bold">Save Time</span><br/>
                   Import your stock trade history from your trading platform, simple and easy.
                  </p>
                </div>

                <div className="mb-5">
                  <p className="h6"><span className="font-weight-bold">Customize Your Experience</span><br/>
                  Custom tailor your stock journal to fit your unique trading style with highly customizable modules.
                  </p>
                </div>
               

              </div>


          </div>
          <div className="col-md-5 offset-1 mt-5">
            <img src={image} alt="" />
          </div>
      </div>
    </div>
   
  );
};

export default Journal;
