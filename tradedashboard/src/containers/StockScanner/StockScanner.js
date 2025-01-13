import React, { useState, useEffect, useRef } from "react";
import NavBottom from "../../components/nav/NavBottom/NavBottom";
import {
  deleteFilter,
  getSavedFilters,
  getStockScannerDropdown,
  saveFilter,
  ScannerFilterApi,
  StockScannerGetapi,
} from "../../services/UserServices";
import "./stockScanner.css";
import useWebSocket from "../../hooks/useWebsocket";
import WithAuth from "../../components/auth/withAuth";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Modal from "../../utils/Modal";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const StockScanner = () => {
  const filtersList = [
    "Exchange",
    "Index",
    "Sector",
    "Industry",
    "Country",
    "Market Cap.",
    "P/E",
    "Forward P/E",
    "PEG",
    "P/S",
    "P/B",
    "Price/Cash",
    "Price/Free Cash Flow",
    "Dividend Yield",
    "Return on Assets",
    "Return on Equity",
    "Return on Investment",
    "Current Ratio",
    "Quick Ratio",
    "LT Debt/Equity",
    "Debt/Equity",
    "Gross Margin",
    "Operating Margin",
    "Net Profit Margin",
    "Payout Ratio",
    "Float Short",
    "Analyst Recom.",
    "Option/Short",
    "Earnings Date",
    "Performance",
    "Performance 2",
    "Volatility",
    "RSI (14)",
    "Gap",
    "20-Day Simple Moving Average",
    "50-Day Simple Moving Average",
    "200-Day Simple Moving Average",
    "Change",
    "Change from Open",
    "20-Day High/Low",
    "50-Day High/Low",
    "52-Week High/Low",
    "Pattern",
    "Candlestick",
    "Beta",
    "Average True Range",
    "Average Volume",
    "Relative Volume",
    "Current Volume",
    "Price",
    "Target Price",
    "IPO Date",
    "Shares Outstanding",
    "Float",
  ];

  const [filters, setFilters] = useState({});
  const [latestCreated, setLatestCreated] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [stockData, setStockData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const skipRef = useRef(null);
const [sortConfig, setSortConfig] = useState({ key: "Ticker", direction: "desc" });
const [selectedOption, setSelectedOption] = useState("");

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [order, setOrder] = useState("desc"); // Default order to 'desc'
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const showAlert = (title, icon) => {
    Swal.fire({
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: "top-end",
      showCloseButton: true,
    });
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    // Use selectedOption for further processing, like updating filters
  };
  // const handleOrderChange = (e) => {
  //   setOrder(e.target.value);
  // };
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);

    // Update sortConfig and trigger sorting
    setSortConfig((prevConfig) => ({
        ...prevConfig,
        direction: newOrder,
    }));
};



  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchSavedFilters();
      await fetchFilterOptions();
      await fetchDropdownData();
      setDataReady(true);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (dataReady) {
        fetchStockData(); // Call fetchStockData only when data is ready and sortConfig changes
    }
}, [sortConfig, page, order, dataReady,selectedOption,filters]);
  const fetchSavedFilters = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("googledata"));
      const uid = userData?.uid;
      const { data: { filters: savedFilters = [] } = {} } =
        await getSavedFilters(uid);

      if (savedFilters.length) {
        const latestDate = savedFilters.reduce(
          (latest, current) =>
            new Date(latest.created_at) > new Date(current.created_at)
              ? latest
              : current,
          savedFilters[0]
        );

        setLatestCreated(latestDate);

        const cleanFilterString = latestDate.filters
          ?.replace(/'/g, '"')
          .replace(/([{,]\s*)([^",:\s][^:]*)(:)/g, '$1"$2"$3')
          .replace(/:\s*([^",}\s][^,}]*)/g, ': "$1"')
          .replace(/,(\s*[}\]])/g, "$1")
          .replace(/,\s*$/, "");

        try {
          const parsedFilters = JSON.parse(cleanFilterString);
          setFilters((prev) => ({ ...prev, ...parsedFilters }));
        } catch (error) {
          console.error("Error parsing cleaned filter string:", error);
        }
      } else {
        resetFiltersToAny();
      }
    } catch (error) {
      console.error("Error fetching saved filters:", error);
      setFilters({});
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const { data: { data: options = {} } = {} } = await ScannerFilterApi(
        filtersList
      );
      setFilterOptions(options);
      setFilters((prev) =>
        filtersList.reduce((acc, key) => {
          acc[key] = prev[key] || "Any";
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchStockData = async () => {
    try {

      setLoading(true);
      const { data: { data: stockData = [] } = {} } = await StockScannerGetapi(
        filters,
        selectedOption,
        order
      );
      setStockData(stockData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status == 406) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
          showCloseButton: true,
        });
        setStockData([]);
      } else {
        setLoading(false);
        console.error("Error fetching stock data:", error);
      }
    }
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFilter = async () => {
    const userData = JSON.parse(localStorage.getItem("googledata"));
    const uid = userData?.uid;

    const formattedFilters = formatSelectedFilters(filters);
    if (formattedFilters === "{}") {
      return showAlert("Cannot save empty filters.", "error");
    }

    try {
      await saveFilter({ uid, filters: formattedFilters });
      showAlert("Filter saved.", "success");
      await fetchSavedFilters();
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode == 400) {
        showAlert(" You can only save filters up to 3 times", "error");
      } else {
        console.error("Failed to save filter:", error);
        showAlert("An unexpected error occurred.", "error");
      }
    }
  };

  const handleDeleteFilter = async () => {
    if (!latestCreated?.created_at) {
      return showAlert("No Filter To Delete.", "error");
    }

    try {
      const userData = JSON.parse(localStorage.getItem("googledata"));
      const uid = userData?.uid;
      const payload = { uid, created_at: latestCreated.created_at };

      const result = await deleteFilter(payload);

      if (result) {
        showAlert("Filter deleted.", "success");

        // Remove the deleted filter from state
        setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          const filterToDelete = latestCreated.filterKey; // Assuming filterKey is the key for the filter being deleted
          if (filterToDelete) {
            updatedFilters[filterToDelete] = "Any";
          }
          return updatedFilters;
        });

        // Fetch the latest saved filters and options
        await fetchSavedFilters();
        await fetchFilterOptions();
      } else {
        console.log("Failed to delete filter.");
      }
    } catch (error) {
      console.error("Error deleting filter:", error);
      // Optionally, revert the state update if the API call fails
      await fetchSavedFilters();
    }
  };

  const resetFiltersToAny = () => {
    setFilters(
      filtersList.reduce((acc, key) => {
        acc[key] = "Any";
        return acc;
      }, {})
    );
  };

  const formatSelectedFilters = (filters) => {
    const selectedFilters = Object.entries(filters)
      .filter(([, value]) => value !== "Any")
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    return `{${Object.entries(selectedFilters)
      .map(([key, value]) => `${key}: ${value}`)
      .join(",")}}`;
  };

  // const handleSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });

  //   const sortedData = [...stockData].sort((a, b) => {
  //     const aValue = parseFloat(a[key]) || 0; // Convert to number, default to 0 if NaN
  //     const bValue = parseFloat(b[key]) || 0;

  //     if (aValue < bValue) {
  //       return direction === "asc" ? -1 : 1;
  //     }
  //     if (aValue > bValue) {
  //       return direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });

  //   setStockData(sortedData);
  // };
  // const handleSort = async (key) => {
  //   // let direction = "asc";
  //   // if (sortConfig.key === key && sortConfig.direction === "asc") {
  //   //   direction = "desc";
  //   // }
  //   let direction = "desc";
  //   if (sortConfig.key === key && sortConfig.direction === "desc") {
  //       direction = "asc"; // Switch to 'asc' if already 'desc'
  //   } else if (sortConfig.key === key && sortConfig.direction === "asc") {
  //       direction = "desc"; // Switch back to 'desc' if already 'asc'
  //   }
  //   setSortConfig({ key, direction });

  //   try {
  //     setOrder(direction);
  //     setSelectedOption(key);
  //     await fetchStockData(); // Call the API when sorting is applied
  //   } catch (error) {
  //     console.error("Error applying sort:", error);
  //   }
  // };

  const handleSort = async (key) => {
    // Determine the new sorting direction
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
        direction = "asc"; // Switch to 'asc' if already 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc"; // Switch back to 'desc' if already 'asc'
    }

    // Update the sorting configuration in a single state update
    setSortConfig({ key, direction });
    setSelectedOption(key);
    setOrder(direction);
};

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const fetchDropdownData = async () => {
    try {
      const response = await getStockScannerDropdown();
      const options = Object.keys(response.data.data); // Extract keys from the object
      setDropdownOptions(options);

      if (options.length > 0) {
        setSelectedOption(options[0].Ticker); // Set the first ticker as the default value
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };
console.log(loading,stockData.length,"9999")
  return (
    <div>
      <NavBottom isStyleChanged />
      <div className="news area-padding">
        <div className="container-fluid StockScanner_section_hp">
          <div className="d-flex align-items-center justify-content-between mt-3 MakePrediction_page_section_hp">
            <h4 className="MakePrediction_page_heading_hp me-2">
              Stock Scanner
            </h4>
            <button
              className="btn btn_main_hp"
              type="button"
              data-toggle="collapse"
              data-target="#StockScanner_filter_section"
              aria-expanded="false"
              aria-controls="StockScanner_filter_section"
            >
              <i className="fa-solid fa-filter mr-2"></i> Filter
            </button>
          </div>
          <div
            className="row mt-3 StockScanner_filter_section collapse multi-collapse"
            id="StockScanner_filter_section"
          >
            <div className="col-12">
              <div className="row mb-3 align-items-end">
                <div className="col-xl-2 col-lg-3 col-md-4 col-12">
                  <label lassName="text-left" htmlFor="orderby">
                  Order by
                  </label>
                  <select
                    className="form-control StockScanner_selectTag_Width"
                    style={{ cursor: 'pointer' }}
                    value={selectedOption}
                    onChange={handleDropdownChange}
                  >
                    {dropdownOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-xl-2 col-lg-3 col-md-4 col-12">
                  <label lassName="text-left" htmlFor="orderby"></label>
                  <select
                    className="form-control StockScanner_selectTag_Width"
                    style={{ cursor: 'pointer' }}
                    value={order}
                    onChange={handleOrderChange}
                  >
                    <option value="desc">desc</option>
                    <option value="asc">asc</option>
                  </select>
                </div>
              </div>
              <hr className="bg-white w-100" />

              <div className="row">
                {filtersList.map((filter, index) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-12"
                    key={index}
                  >
                    <div className="form-group">
                      <label htmlFor={filter}>{filter}</label>
                      <select
                        name={filter}
                               className="form-control StockScanner_selectTag_Width"
                        onChange={handleFilterChange}
                        value={filters[filter]}
                        style={{
                          backgroundColor: filters[filter] !== 'Any' ? '#d0e7ff' : '',
                          color: filters[filter] !== 'Any' ? '#000' : '',
                      
                        }}
                      >
                        {filterOptions[filter]?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <div className="col-12 text-right">
                  <div>{/* Your dropdown */}</div>
                  <button
                    className="btn btn_main2_hp btn-sm mr-3"
                    onClick={handleSaveFilter}
                  >
                    Save Filter
                  </button>
                  <button
                    className="btn-danger btn-sm"
                    onClick={handleDeleteFilter}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row justify-content-between">
              <div className="col-lg-12 col-md-12 mb-4">
                <div className="table-responsive tabalignn custom-table">
                  <table className="table text-white mt-4 trading-day-table">
                    <thead>
                      <tr style={{ backgroundColor: "#020135", cursor: "pointer"}}>
                        <th scope="col" onClick={() => handleSort("Ticker")}>Ticker {getSortIndicator("Ticker")}</th>
                        <th
                          scope="col"
                          onClick={() => handleSort("Market Cap.")}
                        >
                          Market Cap {getSortIndicator("Market Cap.")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Dividend Yield")}>
                          Dividend {getSortIndicator("Dividend Yield")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Return on Assets")}>
                          ROA {getSortIndicator("Return on Assets")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Return on Equity")}>
                          ROE {getSortIndicator("Return on Equity")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Price")}>
                          Price {getSortIndicator("Price")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Change")}>
                          Change {getSortIndicator("Change")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Volume")}>
                          Volume {getSortIndicator("Volume")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Current Ratio")}>
                          Curr R {getSortIndicator("Current Ratio")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Quick Ratio")}>
                          Quick R {getSortIndicator("Quick Ratio")}
                        </th>

                        <th scope="col" onClick={() => handleSort("LT Debt/Equity")}>
                          LTDebt/Eq {getSortIndicator("LT Debt/Equity")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Total Debt/Equity")}>
                          Debt/Eq {getSortIndicator("Total Debt/Equity")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Gross Margin")}>
                          Gross M {getSortIndicator("Gross Margin")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Operating Margin")}>
                          Oper M {getSortIndicator("Operating Margin")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Net Profit Margin")}>
                          Profit M {getSortIndicator("Net Profit Margin")}
                        </th>
                        <th scope="col" onClick={() => handleSort("Earnings Date")}>
                          Earnings{getSortIndicator("Earnings Date")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                            <tr>
                              <td colSpan="16" className="text-center">
                                <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </td>
                            </tr>
                          ) : (
                      stockData.length ? (
                        stockData.map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? "#150550" : "#020135",
                            }}
                          >
                            <td>{item?.Ticker || "--"}</td>
                            <td>{item?.["Market Cap"] || "--"}</td>
                            <td>{(+item.Dividend).toFixed(4) || "--"}</td>
                            <td>{(+item?.ROA).toFixed(4) || "--"}</td>
                            <td>{(+item?.ROE).toFixed(4) || "--"}</td>
                            <td>{(+item?.Price).toFixed(4) || "--"}</td>
                            <td>{(+item?.Change).toFixed(4) || "--"}</td>
                            <td>{(+item?.Volume).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Curr R"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Quick R"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["LTDebt/Eq"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Debt/Eq"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Gross M"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Oper M"]).toFixed(4) || "--"}</td>
                            <td>{(+item?.["Profit M"]).toFixed(4) || "--"}</td>
                            <td>{item?.Earnings || "--"}</td>
                          </tr>
                        ))
                      ) : (
                        !loading && stockData.length == 0 && (   <tr>
                          <td colSpan="16" className="text-center">
                            Record not found
                          </td>
                        </tr>)
                      ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={({ selected }) => setPage(selected + 1)}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={totalCount / 10}
                    previousLabel="<"
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};

export default WithAuth(StockScanner);
