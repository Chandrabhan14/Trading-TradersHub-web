import React ,{useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { postDaily } from "../../services/DashboardServices";
const Table = (props) => {
  const { listItems } = props;
  const navigate = useNavigate()
  const HandleNavigate = (ticker)=>{
    navigate(`/search/${ticker}`)
  }




  const [inputValues, setInputValues] = useState({});


 
  const postDailyData = async (data) => {
    try {
      const response = await postDaily(data);

      if (response?.status === 200) {
        setInputValues("")

        console.log("Post successful:", response?.data);
      } else {
        console.log("Post failed with status:", response?.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



   return (
    <div>
      <table className="table stock table-hover">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change($)</th>
          </tr>
        </thead>
        <tbody>
          {listItems?.map((item, index) => {
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
                // onClick={()=>HandleNavigate(item.symbol)}
              >
                <td d onClick={()=>HandleNavigate(item.symbol)}  ata-tooltip-id="my-tooltip-1" data-tooltip-content={item?.name}>{item.symbol}
                
                <ReactTooltip
          id="my-tooltip-1"
          place="bottom"
          variant="info"
        />
                </td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.change.toFixed(2)}</td>
                <td>{item.changesPercentage.toFixed(2)}</td>
              </tr>
              
            );
          
          })}
   
        </tbody>
      </table>
    </div>
  );
};

export default Table;
