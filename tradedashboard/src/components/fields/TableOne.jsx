import React ,{useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { postDaily } from "../../services/DashboardServices";
import { addWatchListData, deleteWatchlistData, getWatchLista } from "../../services/UserServices";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    symbol: Yup.string().required('Stock symbol is required') // Define validation rules
  });


const TableOne = (props) => {
  const { listItems , postItem } = props;
  const navigate = useNavigate()
  const HandleNavigate = (ticker)=>{
    navigate(`/search/${ticker}`)
  }


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema) // Use Yup resolver
  });

  const [inputValues, setInputValues] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const handleInputChange = (index, value) => {
    setInputValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      // Capture the latest value directly from the event
      const data = {
        uid: localStorage.getItem("uid"),
        symbols: event.target.value,
      };
      postDailyData(data);
    }
  };

  const postDailyData = async (data) => {
    try {
 
    const response = await postDailyData(data);

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


  const deleteItem = async (sym) => {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
      
  
        try {

            const data = {
                uid: localStorage.getItem("uid"),
                symbol: sym,
              };

              const  uid =  localStorage.getItem("uid")
              const     symbol = data?.symbol
          // Call the API to delete the item
          const response = await deleteWatchlistData(uid,symbol);
      
          if(response.status == 200 ){
            Swal.fire(
                'Deleted!',
                'symbol has been deleted.',
                'success'
              );
            
          }
          postItem()
       
        } catch (error) {
          console.error("Error deleting item:", error);
        
        }
      }
    });
  };
  const handleAddStock = async (data) => {
    const Obj1={
        uid: localStorage.getItem("uid"),
        symbol: data.symbol.toUpperCase(),
      }
    try {
      const response = await addWatchListData(Obj1);
      if (response?.status === 200) {
        Swal.fire("Post successfully");
        postItem()
        reset(); 
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
            {user?.is_admin ? <th>Change Symbol</th> :""}
          </tr>
        </thead>
        <tbody>
          {listItems?.map((item, index) => {
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
       
              >
                <td onClick={()=>HandleNavigate(item.symbol)}  ata-tooltip-id="my-tooltip-1" data-tooltip-content={item?.name}>{item.symbol}
                
                <ReactTooltip
          id="my-tooltip-1"
          place="bottom"
          variant="info"
        />
                </td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.change.toFixed(2)}</td>
                <td>{item.changesPercentage.toFixed(2)}</td>
                {user?.is_admin ? (<>
                              <td >
                             
                        <button  className="btn_main2_hp" onClick={() => deleteItem(item.symbol)}>Delete</button> {/* Delete button */}
                  
                              </td></>):''} 
              </tr>
              
            );
          
          })}
   
        </tbody>
      </table>
   {  user.is_admin && ( <form onSubmit={handleSubmit(handleAddStock)}>
      <input 
      className="form-control"
    
          type="text" 
          placeholder="Enter stock symbol" 
          {...register("symbol")} // Include register and add the "name" attribute
        />
        {errors.symbol && <p>{errors.symbol.message}</p>}
        <button  className="btn_main2_hp" type="submit">Add Stock</button>
      </form>)}
    </div>
  );
};

export default TableOne;
