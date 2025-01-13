import React, { useState, useEffect, useRef } from "react";
import { getAllPortfolios } from "../../services/UserServices";
import { updatePortfolio } from "../../services/UserServices";
import { deletePortfolio } from "../../services/UserServices";
import { postCreatePortfolio } from "../../services/UserServices";
import Side from "../../components/sidebar/side";
import "./PaperTrading.css";

import NavBottom from "../../components/nav/NavBottom/NavBottom";
import ModalComponent from "../../components/modal/popup/ModalComponent";
import { useNavigate } from "react-router-dom";
import Button from "../../components/fields/Button";
import WithAuth from "../../components/auth/withAuth";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Modal from "../../utils/Modal";
import moment from "moment";

const PaperTradingPortfolios = () => {
  const [popUpModal, setPopUpModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [portfolios, setPortfolios] = useState([]);

  const [error, setError] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [balance, setBalance] = useState("0");
  const [newPortfolioName, setNewPortfolioName] = useState(portfolioName);
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errormessage,setErrormessage] = useState(null);
  const [page,setPage] = useState(1);
  const [totalCount,setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skipRef = useRef(null);

  useEffect(() => {
    // Access the DOM element using the ref
    const SkipElement = skipRef.current;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isFirstLogin = user?.first_login;

    const currentDate = moment().tz("America/New_York");

    // Parse the plan end date string
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

    // Compare the dates
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
       setIsModalOpen(true)
    } else {
      console.log("Plan is still active.");
    }
  }, []);


  const validationSchema = Yup.object().shape({
    portfolioName: Yup.string().trim().required('Please fill the input field').max(55,"portfolio name must not exceed 55 characters"),
 
  });




  const getPortfolios = async (uID) => {
    try {
      setLoading(true);
      const response = await getAllPortfolios(uID,page);
      setBalance(response?.data?.data?.balance);
      if (response?.status == 200 || response?.data?.statusCode == 200) {
 
        setPortfolios(response?.data?.data?.data);
        setTotalCount(response?.data?.data?.total_count)
       
      } else {
        setError(response?.data?.message);
        setPortfolios([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };





  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const onSubmit = async (data) => {
      try {
        const result = await postCreatePortfolio({
          portfolio_name: data.portfolioName,
          uid: uid,
        });
        if (result?.status == 200 && result?.data?.statusCode ==  200 ){
          handleIsOpenModal();
          getPortfolios(uid);
          reset(); 
        }
      
       
      } catch (error) {

if(error){
  setErrormessage(error?.response?.data?.message)   
}  setTimeout(() => {
  setErrormessage("");
}, 3000);
      }
    }




  const handlePopUpModal = () => {
    setPopUpModal(true);
    setIsOpenModal(true);
  };

  const handleIsOpenModal = () => {
    reset();
    setIsOpenModal(false);
  };

  const hadleEdit = (port) => {
    setPopUpModal(false);
    setIsOpenModal(true);
    setEditModal(true);
    setPortfolioName(port);
  };

  const handleEditBtn = async (e) => {
    e.preventDefault();
    try {
      const result = await updatePortfolio({
        uid,
        portfolio_name: portfolioName,
        new_portfolio_name: newPortfolioName,
      });

      handleIsOpenModal();
      getPortfolios(uid);
    } catch (error) {
      if(error){
        setErrormessage(error?.response?.data?.message)   
      }  setTimeout(() => {
        setErrormessage("");
      }, 3000);
      console.log(error);
    }
  };

  const handleDeleteBtn = async (dltPorfolioName) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        icon: "warning",
        dangerMode: true,
      });

    

      if (result.isConfirmed) {
        // User confirmed the delete action
         deletePortfolio({
          uid,
          portfolio_name: dltPorfolioName,
        }).then((res)=> {
            if(res?.data?.statusCode == 200){
              if(portfolios?.length == 1 && page > 1){
                  setPage(page - 1)
                  
              }else{
              getPortfolios(uid);

              }

          // Show success message
          Swal.fire("Deleted!", "Your portfolio has been deleted.", "success");
        }
      }).catch((E) => {
          Swal.fire("Failed!","failed to delete.", "error");
        });
  
      
       
       }
    
    } catch (error) {
      console.log(error);
          }
  };
  




  const customStyles = {
    modalOverlay: {
      backgroundColor: "rgb(0 0 0 / 52%)", // Custom background color for the modal overlay
    },
    modalContent: {
      maxWidth: "400px", // Custom maximum width for the modal content
    },
 
  };
  // Automatically send a message every 5 seconds
  useEffect(() => {
    const dataString = localStorage.getItem("googledata");
    const userDataFromLocalStorage = JSON.parse(dataString);
    const uid = userDataFromLocalStorage?.uid;
    setUid(uid);
    getPortfolios(uid);
    }, [page]);

  return (
    <>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding ">
        <div className="container-fluid Paper_Trading_Section_Hp">
          {/* Sidebar Section */}
          <Side />
          {/* Sidebar Section */}

          <div className="mb-4 content content_section_hp">
            <div className="Paper_Trading_TopMoney_area">
              <Button
                style={"btn btn_main_hp mb-3"}
                handleClick={handlePopUpModal}
                textBtn={"Create Portfolio"}
              />

              <p className="mb-3">
                Available Money: <strong>{balance}</strong>
              </p>
            </div>

            <div className="table-responsive tabalignn custom-table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>{"S No."}</th>
                    <th>{"Portfolio Name"}</th>
                    <th>{"Action"}</th>
                  </tr>
                </thead>
                <tbody>
                  { loading ? 
                  
                  (
                    <tr>
                      <td colSpan="21" className="text-center py-5">
                        <div
                          className="spinner-border  "
                          style={{
                            width: "3rem",
                            height: "3rem",
                            color: "white",
                          }}
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )
                  
                  : 
                  
                  
                  
                  portfolios?.length === 0 ? (
                    <tr>
                      <td className="no-data-show"> {error || "Record not found"} </td>
                    </tr>
                  ) : (
                    portfolios?.map((portfolio, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{portfolio?.portfolio_name}</td>
                          <td>
                            <div className="Paper_Trading_table_actionBtn">
                              <i
                                className="fa-regular fa-pen-to-square"
                                onClick={() =>
                                  hadleEdit(portfolio.portfolio_name)
                                }
                              ></i>
                              <i
                                className="fa-regular fa-trash-can"
                                onClick={() =>
                                  handleDeleteBtn(portfolio.portfolio_name)
                                }
                              ></i>
                              <i
                                className="fa-regular  fa-eye"
                                onClick={() =>
                                  navigate(
                                    `/paper-stocks/${portfolio.portfolio_name}`
                                  )
                                }
                              ></i>
                            </div>
                          </td>
 
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={(event) => {
                  setPage(event.selected + 1);
                }}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={totalCount / 10}
                previousLabel="< "
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              /> 

            </div>
          </div>
        </div>

        <div className="Create_PaperTreading_modal">
          {editModal && (
            <ModalComponent
              isOpen={isOpenModal}
              onClose={handleIsOpenModal}
              styles={customStyles}
            >
              <form>
                <img
                  src="https://images.unsplash.com/photo-1651340981821-b519ad14da7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                  srcset=""
                />
                <div className="form_Content_area">
                  <div className="form-group">
                    <label for="formGroupExampleInput">Portfolio Name </label>
                    <input
                     
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      defaultValue={portfolioName}
                      placeholder="Portfolio name"
                
                      onChange={(e) => setNewPortfolioName(e.target.value.trim())}
                    />
                      {errors.portfolioName && (
                  <p style={{ color: "red" }}>{errors.portfolioName.message}</p>
                )}
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <Button
                      style={"buyBtn"}
                      handleClick={handleEditBtn}
                      textBtn={"Update"}
                    />
                    <Button
                      style={"sellBtn"}
                      handleClick={handleIsOpenModal}
                      textBtn={"Cancel"}
                    />
                  </div>
                  {errormessage && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {errormessage}
                  </div>)}
                </div>
              </form>{" "}
            </ModalComponent>
          )}
        </div>

        <div className="Create_PaperTreading_modal">
          {popUpModal && (
            <ModalComponent
              isOpen={isOpenModal}
              onClose={handleIsOpenModal}
              styles={customStyles}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <img
                  src="https://images.unsplash.com/photo-1651340981821-b519ad14da7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt=""
                  srcset=""
                />
                <div className="form_Content_area">
                  <div className="form-group">
                    <label
                      for="formGroupExampleInput"
                      style={{ color: "black" }}
                    >
                      Portfolio Name:{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Portfolio name"
              
                      {...register('portfolioName')}
                    />
                {errors.portfolioName && (
                  <p style={{ color: "red" }}>{errors.portfolioName.message}</p>
                )}
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <Button
                      style={"buyBtn"}
                      type="submit"
                      textBtn={"Create"}
                    />
                    <Button
                      style={"sellBtn"}
                      handleClick={handleIsOpenModal}
                      textBtn={"Cancel"}
                    />


                  </div>

                  {errormessage && (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {errormessage}
                  </div>)}
                 
               
                  

                </div>
              </form>
            </ModalComponent>
          )}
        </div>
      </div>
          {  isModalOpen &&  < Modal/>}
    </>
  );
};

export default WithAuth(PaperTradingPortfolios);
