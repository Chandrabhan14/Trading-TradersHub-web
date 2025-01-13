import React, { useEffect, useRef, useState } from "react";
import NavBottom from "../components/nav/NavBottom/NavBottom";
import {
  getHolidaysandtradinghours,
  getMarketsummarysnapshot,
  getMarketperformance,
  getPremarket,
  getwallstreetbets,
  getCompanyquote,
  getUpgradesdowngradesfeed,
  getCallratio,
  getFundamentals,
  getEconomicCalendarData,
  getCommodityData,
  getEtfData,
  getCurrency,
  getBondratesData,
  getCryptoData,
  getEtfDecliner,
  getEtfGainer,
  getCommodityEnergyData, getCommodityAgriData, getCommodityMetalData, getCommodityLiveStockData,
} from "../services/DashboardServices";

import { MiniChart } from "react-ts-tradingview-widgets";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { StockHeatmap } from "react-ts-tradingview-widgets";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import WithAuth from "../components/auth/withAuth";

import moment from "moment";
import ReactPaginate from "react-paginate";
import html2canvas from "html2canvas";

import thl3 from "../assets/img/logo/thl3.png";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChartComponent = ({ data }) => {
  const chartData = {
    labels: data?.map((entry) => entry.Ticker),
    datasets: [
      {
        label: "Count",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data?.map((entry) => entry.Count),
      },
      {
        label: "Sentiment",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(192,75,192,0.4)",
        borderColor: "rgba(192,75,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(192,75,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data?.map((entry) => entry.Sentiment),
      },
    ],
  };

  return <Line data={chartData} />;
};

function MainDashboard() {
  const [holidaysand, setHolidaysand] = useState();
  const [marketsnapshot, setMarketsnapshot] = useState();
  const [marketsummary, setMarketsummary] = useState();
  const [marketperformance, setMarketperformance] = useState();
  const [premarket, setPremarket] = useState();
  const [wallstreetbet, setWallstreetbet] = useState([]);
  const [companyquote, setCompanyquote] = useState();
  const [upgradesdowngradesfeed, setUpgradesdowngradesfeed] = useState([]);
  const [callratio, setCallratio] = useState();
  const [fundamentals, setfundamentals] = useState("");

  const [stock, setStock] = useState("SPY,QQQ,IWM,DIA");
  const [crypto, setCrypto] = useState("BTCUSD");
  const [iscandleType, setIscandleType] = useState("false");
  const [today, setToday] = useState("");
  const [exchanges, setExchanges] = useState("SPX,QQQ,DJX,OEX");
  const [ticker, setticker] = useState("AAPL");
  const [companyticker, setCompanyticker] = useState(
    "%5ETNX,%5EVIX,%5EVXN,%5EGDAXI,%5EFTSE,%5EN225,%5EGSPTSE,CLUSD,BZUSD,NGUSD,GCUSD,SIUSD,PLUSD,HGUSD,LBUSD,EURUSD,GBPUSD,USDJPY,USDCAD,AUDUSD,USDCHF,USDHKD,EURGBP,BTCUSD,ETHUSD,SOLUSD,ADAUSD,DOGEUSD,XRPUSD,BNBUSD,LTCUSD"
  );

  const [economicApiData, setEconomicApiData] = useState([]);
  const [setCommodity, setCommodityData] = useState([]);
  const [etfData, setEtfData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [bondRatesData, setBondRatesData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [etfGainer, setEtfGainer] = useState([]);
  const [etfDecliner, setEtfDecliner] = useState([]);

  const [metalCommodity, setMetalCommodityData] = useState([]);
  const [agriCommodity, setAgriCommodityData] = useState([]);
  const [liveCommodity, setLiveCommodityData] = useState([]);
  const [energyCommodity, setEnergyCommodityData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const skipRef = useRef(null);

  useEffect(() => {
  
    const SkipElement = skipRef.current;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isFirstLogin = user?.first_login;

    const currentDate = moment().tz("America/New_York");

    
    const planEndDateString = user?.plan_end_date;
    const planEndDate = moment(planEndDateString).tz("America/New_York");

   
    if (currentDate.isAfter(planEndDate)) {
      console.log("Plan has expired!");
       setIsModalOpen(true)
    } else {
      console.log("Plan is still active.");
    }
  }, []);

const navigate = useNavigate()

const handleNavigate = (ticker) =>{
  navigate(`/search/${ticker}`)
}
  const fetchMetalData = async () => {
    try {
      setLoading(true);
      const response = await getCommodityMetalData();
      if (response.status == 200) {
        setMetalCommodityData(response?.data?.data?.data);
   
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetalData();
  }, []);


  const fetchLiveStockData = async () => {
    try {
      setLoading(true);
      const response = await getCommodityLiveStockData();
      if (response.status == 200) {
        setLiveCommodityData(response?.data?.data?.data);
      
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLiveStockData();
  }, []);

  const fetchAgriData = async () => {
    try {
      setLoading(true);
      const response = await getCommodityAgriData();
      if (response.status == 200) {
        setAgriCommodityData(response?.data?.data?.data);
    
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgriData();
  }, []);



  const fetchEnergyData = async () => {
    try {
      setLoading(true);
      const response = await getCommodityEnergyData();
      if (response.status == 200) {
        setEnergyCommodityData(response?.data?.data?.data);
      
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnergyData();
  }, []);


  
  const fetchEtfDecliner = async () => {
    try {
      setLoading(true);
      const response = await getEtfDecliner();
      if (response.status == 200) {
        setEtfDecliner(response?.data?.data?.data);
      
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEtfDecliner();
  }, []);

  const fetchEtfGainer = async () => {
    try {
      setLoading(true);
      const response = await getEtfGainer();
      if (response.status == 200) {
        setEtfGainer(response?.data?.data?.data);
     
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEtfGainer();
  }, []);

  const fetchEtfData = async () => {
    try {
      setLoading(true);
      const response = await getEtfData();
      if (response.status == 200) {
        setEtfData(response?.data?.data?.data);
      
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEtfData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await getCryptoData();
      if (response.status == 200) {
        setCryptoData(response?.data?.data?.data);
       
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      setLoading(true);
      const response = await getCurrency();
      if (response.status == 200) {
        setCurrencyData(response?.data?.data?.data);
 
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchBondData = async () => {
    try {
      setLoading(true);
      const response = await getBondratesData();
      if (response.status == 200) {
        setBondRatesData(response?.data?.data?.data);
       
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBondData();
  }, []);

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

  const fetchMarketsnapshotData = async () => {
    try {
      const response = await getMarketsummarysnapshot(stock);
      if (response.status == 200) {
        const res = response?.data?.data;
        setMarketsnapshot(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchMarketsnapshotData();
  }, [stock]);


  const fetchMarketperformanceData = async () => {
    try {
      const response = await getMarketperformance();
      if (response.status === 200) {
        const res = response?.data?.data;
        setMarketperformance(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchMarketperformanceData();
  }, []);

  const fetchPremarketData = async () => {
    try {
      const response = await getPremarket();
      if (response.status === 200) {
      
        const res = response?.data?.data;
        setPremarket(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPremarketData();
  }, []);

  const fetchWallstreetbetsData = async () => {
    try {
      const response = await getwallstreetbets();
      if (response.status == 200) {
        const res = response?.data?.data;
        setWallstreetbet(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchWallstreetbetsData();
  }, []);

  const fetchCompanyquoteData = async () => {
    try {
      const response = await getCompanyquote(companyticker);
      if (response.status == 200) {
   
        const res = response?.data?.data;
        setCompanyquote(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchCompanyquoteData();
  }, [companyticker]);

  const fetchUpgradesdowngradesfeedData = async () => {
    try {
      const response = await getUpgradesdowngradesfeed();


      if (response.status == 200) {
  
        const res = response?.data;

        setUpgradesdowngradesfeed(res?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchUpgradesdowngradesfeedData();
  }, []);

  const fetchCallratioData = async () => {
    try {
      const response = await getCallratio(exchanges);
      if (response.status == 200) {
        const res = response?.data;
        setCallratio(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchCallratioData();
  }, [exchanges]);

  console.log(totalCount, "----------------->");

  useEffect(() => {
    
    const fetchData = async () => {
      const currentDate = moment().tz("America/New_York").format("YYYY-MM-DD");
      const limit = 10;
      try {
        const response = await getEconomicCalendarData(
          currentDate,
          limit,
          page
        );
        if (response.status === 200) {
          setEconomicApiData(response?.data?.data?.data);
          setTotalCount(response?.data?.data?.total_count);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
  
      }
    };

    fetchData();
  }, [page]);



  const FundamentalsData = async () => {
    try {
      const response = await getFundamentals(ticker);
      if (response.status == 200) {
        const res = response?.data;
        setfundamentals(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    FundamentalsData();
  }, [ticker]);

  const fetchCommodityData = async () => {
    try {
      const response = await getCommodityData();
      if (response.status == 200) {
        setCommodityData(response?.data?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchCommodityData();
  }, []);



  const handleScreenshot = () => {
    const targetDiv = document.getElementById('capture'); 
    targetDiv.style.backgroundColor = "#010033";
   

    html2canvas(targetDiv).then((originalCanvas) => {
      const logo = new Image();

      logo.src = thl3; 
      logo.onload = () => {
        const newCanvas = document.createElement('canvas');
        const context = newCanvas.getContext('2d');

        newCanvas.width = originalCanvas.width;
        newCanvas.height = originalCanvas.height;

        context.drawImage(originalCanvas, 0, 0);

        const logoWidth = 100;
        const logoHeight = (logoWidth / logo.width) * logo.height;
        const topMargin = 20;
        const rightMargin = 20;

        context.drawImage(
          logo,
          newCanvas.width - logoWidth - rightMargin,
          topMargin,
          logoWidth,
          logoHeight
        );

        const screenshot = newCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'screenshot.png';

        downloadLink.click();
      };
    });
  };

  return (
  <>
    <div>
      <NavBottom isStyleChanged />
      <div className="notify-overlay"></div>

      <div className="dashboard-area bg-color area-padding">
        <div className="container-fluid MainDashboard_Section_Hp">
          <div className="row mb-4">
            <div className="col-12 mb-4">
              <h2 className="chart-color Heading_content_hp d-flex justify-content-between Calender_Screenshot_area">
                Summary Snapshot

                <div className="d-flex justify-content-start" >
                  <button onClick={handleScreenshot} className="btn btn_main2_hp" title="Screenshot">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                      <path d="M22.2402 8H39.0002C39.2655 8 39.5198 8.10536 39.7073 8.29289C39.8949 8.48043 40.0002 8.73478 40.0002 9V10.31C40.0002 10.5752 40.1056 10.8296 40.2931 11.0171C40.4807 11.2046 40.735 11.31 41.0002 11.31C41.2655 11.31 41.5198 11.2046 41.7073 11.0171C41.8949 10.8296 42.0002 10.5752 42.0002 10.31V8H45.0002C45.2655 8 45.5198 7.89464 45.7073 7.70711C45.8949 7.51957 46.0002 7.26522 46.0002 7C46.0002 6.73478 45.8949 6.48043 45.7073 6.29289C45.5198 6.10536 45.2655 6 45.0002 6H42.0002V3C42.0002 2.73478 41.8949 2.48043 41.7073 2.29289C41.5198 2.10536 41.2655 2 41.0002 2C40.735 2 40.4807 2.10536 40.2931 2.29289C40.1056 2.48043 40.0002 2.73478 40.0002 3V6H22.2402C21.975 6 21.7207 6.10536 21.5331 6.29289C21.3456 6.48043 21.2402 6.73478 21.2402 7C21.2402 7.26522 21.3456 7.51957 21.5331 7.70711C21.7207 7.89464 21.975 8 22.2402 8ZM22.7602 19C22.7602 20.0364 23.0676 21.0495 23.6433 21.9112C24.2191 22.7729 25.0375 23.4445 25.995 23.8411C26.9525 24.2377 28.006 24.3415 29.0225 24.1393C30.039 23.9371 30.9726 23.4381 31.7055 22.7052C32.4383 21.9724 32.9374 21.0387 33.1396 20.0223C33.3417 19.0058 33.238 17.9522 32.8414 16.9947C32.4448 16.0373 31.7731 15.2189 30.9114 14.6431C30.0497 14.0673 29.0366 13.76 28.0002 13.76C26.6113 13.7626 25.28 14.3156 24.2979 15.2977C23.3158 16.2798 22.7629 17.6111 22.7602 19ZM31.2402 19C31.2402 19.6408 31.0502 20.2672 30.6942 20.8C30.3382 21.3329 29.8322 21.7481 29.2401 21.9934C28.6481 22.2386 27.9966 22.3028 27.3681 22.1777C26.7396 22.0527 26.1623 21.7441 25.7092 21.291C25.2561 20.8379 24.9475 20.2606 24.8225 19.6321C24.6975 19.0036 24.7616 18.3521 25.0069 17.7601C25.2521 17.1681 25.6674 16.6621 26.2002 16.306C26.733 15.95 27.3594 15.76 28.0002 15.76C28.8587 15.7626 29.6813 16.1048 30.2883 16.7119C30.8954 17.3189 31.2376 18.1415 31.2402 19Z" />
                      <path d="M45 40H42V15.61C42 15.3448 41.8946 15.0904 41.7071 14.9029C41.5196 14.7154 41.2652 14.61 41 14.61C40.7348 14.61 40.4804 14.7154 40.2929 14.9029C40.1054 15.0904 40 15.3448 40 15.61V30.07L38 27.44C37.7148 27.077 37.3544 26.78 36.9436 26.5694C36.5327 26.3588 36.0812 26.2396 35.62 26.22C35.1512 26.1947 34.6824 26.2709 34.2457 26.4435C33.809 26.6161 33.4148 26.881 33.09 27.22L29 31.49C28.8805 31.6149 28.7369 31.7144 28.578 31.7823C28.419 31.8502 28.2479 31.8853 28.075 31.8853C27.9021 31.8853 27.731 31.8502 27.572 31.7823C27.4131 31.7144 27.2695 31.6149 27.15 31.49L22.74 26.2C22.4508 25.8641 22.0956 25.5914 21.6965 25.3987C21.2974 25.206 20.8629 25.0975 20.42 25.08C19.9752 25.0605 19.5312 25.1321 19.1151 25.2903C18.6989 25.4485 18.3195 25.69 18 26L8 35.82V24.43C8 24.1648 7.89464 23.9104 7.70711 23.7229C7.51957 23.5354 7.26522 23.43 7 23.43C6.73478 23.43 6.48043 23.5354 6.29289 23.7229C6.10536 23.9104 6 24.1648 6 24.43V40H3C2.73478 40 2.48043 40.1054 2.29289 40.2929C2.10536 40.4804 2 40.7348 2 41C2 41.2652 2.10536 41.5196 2.29289 41.7071C2.48043 41.8946 2.73478 42 3 42H6V45C6 45.2652 6.10536 45.5196 6.29289 45.7071C6.48043 45.8946 6.73478 46 7 46C7.26522 46 7.51957 45.8946 7.70711 45.7071C7.89464 45.5196 8 45.2652 8 45V42H40V45C40 45.2652 40.1054 45.5196 40.2929 45.7071C40.4804 45.8946 40.7348 46 41 46C41.2652 46 41.5196 45.8946 41.7071 45.7071C41.8946 45.5196 42 45.2652 42 45V42H45C45.2652 42 45.5196 41.8946 45.7071 41.7071C45.8946 41.5196 46 41.2652 46 41C46 40.7348 45.8946 40.4804 45.7071 40.2929C45.5196 40.1054 45.2652 40 45 40ZM38 40H9.17C8.94048 40.0122 8.71262 39.9548 8.51631 39.8352C8.32001 39.7157 8.16444 39.5396 8.07 39.33C8.02815 39.2248 8.00448 39.1132 8 39C7.98968 38.8696 8.00958 38.7387 8.05815 38.6173C8.10671 38.4959 8.18263 38.3873 8.28 38.3L19.38 27.38C19.5034 27.2596 19.6511 27.167 19.8132 27.1084C19.9754 27.0498 20.1481 27.0264 20.32 27.04C20.4877 27.0457 20.6524 27.086 20.8038 27.1583C20.9552 27.2305 21.0901 27.3332 21.2 27.46L25.61 32.7C25.9081 33.0427 26.2742 33.3198 26.685 33.5136C27.0958 33.7074 27.5424 33.8138 27.9964 33.8261C28.4505 33.8383 28.9022 33.7561 29.3228 33.5846C29.7434 33.4131 30.1239 33.1562 30.44 32.83L34.49 28.56C34.6153 28.4353 34.765 28.3378 34.9298 28.2739C35.0946 28.2099 35.2709 28.1807 35.4475 28.1882C35.6241 28.1958 35.7973 28.2398 35.9561 28.3175C36.1148 28.3953 36.2558 28.5051 36.37 28.64L39.79 33.06C39.9125 33.2172 39.9793 33.4107 39.98 33.61V39C39.957 39.2876 39.821 39.5543 39.6017 39.7418C39.3823 39.9292 39.0977 40.0221 38.81 40H38ZM3 8H6V19.12C6 19.3852 6.10536 19.6396 6.29289 19.8271C6.48043 20.0146 6.73478 20.12 7 20.12C7.26522 20.12 7.51957 20.0146 7.70711 19.8271C7.89464 19.6396 8 19.3852 8 19.12V9C8 8.73478 8.10536 8.48043 8.29289 8.29289C8.48043 8.10536 8.73478 8 9 8H16.94C17.2052 8 17.4596 7.89464 17.6471 7.70711C17.8346 7.51957 17.94 7.26522 17.94 7C17.94 6.73478 17.8346 6.48043 17.6471 6.29289C17.4596 6.10536 17.2052 6 16.94 6H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8Z" />
                    </svg>
                  </button>
                </div>
              </h2>
            </div>

            {marketsnapshot?.map((item, index) => (
              <div
                key={index}
                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4"
              >
                <div className="MainDashboard_TopChart_item">
                 
                  <MiniChart
                    key={index}
                    colorTheme="dark"
                    width="100%"
                    symbol={item?.symbol}
                  ></MiniChart>
                </div>
              </div>
            ))}
          </div>

          <div id="capture" >




            <div className="row mb-4" >
              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table">
                  <h2 className="chart-color Heading_content_hp px-0">
                    Economic calendar
                  </h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="">Time</th>
                          <th>Event</th>
                          <th>Impact</th>
                          <th>Previous</th>
                          <th>Forecast</th>
                          <th>Actual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {economicApiData?.map((event, index) => (
                          <>
                            <tr key={index}>
                              <td className="word">
                                {" "}
                                {event.released_on_gmt_timestamp
                                  ? moment(
                                    event.released_on_gmt_timestamp
                                  ).format("h:mm A")
                                  : "--"}
                              </td>
                              <td>
                                <div>
                                  <p className="mb-0">
                                    {event.name ? event.name : "--"}
                                  </p>
                                </div>
                              </td>
                              <td>{event.impact ? event.impact : "--"}</td>
                              <td>
                                <div>
                                  <p className="mb-0">
                                    {event.previous ? event.previous : "--"}
                                  </p>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <p className="mb-0">
                                    {event.consensus ? event.consensus : "--"}
                                  </p>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <p className="mb-0">
                                    {event.actual ? event.actual : "--"}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
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
              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item">
                  <h2 className="chart-color Heading_content_hp px-0">
                    Biggest Volume Pre-Market
                  </h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="">Time</th>
                          <th>Ticker</th>
                          <th>Change</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {premarket?.map((item, index) => (
                          <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                            <td className="word">{item?.time}</td>
                            <td>{item?.symbol}</td>
                            <td>{item?.change}</td>
                            <td>{`$${item?.price}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item">
                  <h2 className="chart-color Heading_content_hp px-0">
                    Market Heatmap
                  </h2>
                  <div className="MainDashboard_Chart_area">
                    <StockHeatmap
                      colorTheme="dark"
                      width="100%"
                      height="100%"
                    ></StockHeatmap>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item">
                  <h2 className="chart-color Heading_content_hp px-0">
                    Today's Upgrades & Downgrades
                  </h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="">Ticker </th>
                          <th>Action </th>
                          <th>Analyst Firm</th>
                          <th>Rating </th>
                        </tr>
                      </thead>
                      <tbody>
                        {upgradesdowngradesfeed?.map((item, index) => (
                          <tr key={index} onClick={()=>handleNavigate(item?.Ticker)}>
                            <td className="word">{item?.Ticker}</td>
                            <td>{item?.Type}</td>
                            <td>{item?.["Analyst Firm"]}</td>
                            <td>{item?.["Current Rating"]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item">
                  <h2 className="chart-color Heading_content_hp px-0">
                    US, Global Market Indices and Commodities
                  </h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="">Ticker </th>
                          <th>Name</th>
                          <th>Value</th>
                          <th>Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyquote?.map((item, index) => (
                          <tr key={index} >
                            <td className="word">{item?.symbol}</td>
                            <td>{item?.name}</td>
                            <td>{item?.price}</td>
                            <td>{item?.change}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table">
                  <h2 className="chart-color Heading_content_hp px-0 pl-0">
                    Commodities
                  </h2>
                  <div className="table-responsive ">
                    <ul
                      className="nav nav-pills mb-2"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link btn_main_hp active"
                          id="pills-MostActive-tab"
                          data-toggle="pill"
                          data-target="#pills-MostActive"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Most active
                        </button>
                      </li>
                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-Energy-tab"
                          data-toggle="pill"
                          data-target="#pills-Energy"
                          type="button"
                          role="tab"
                          aria-controls="pills-Energy"
                          aria-selected="false"
                        >
                          Energy
                        </button>
                      </li>
                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-Metals-tab"
                          data-toggle="pill"
                          data-target="#pills-Metals"
                          type="button"
                          role="tab"
                          aria-controls="pills-Metals"
                          aria-selected="false"
                        >
                          Metals
                        </button>
                      </li>

                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-Agriculture-tab"
                          data-toggle="pill"
                          data-target="#pills-Agriculture"
                          type="button"
                          role="tab"
                          aria-controls="pills-Agriculture"
                          aria-selected="false"
                        >
                          Agriculture
                        </button>
                      </li>
                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-Livestock-tab"
                          data-toggle="pill"
                          data-target="#pills-Livestock"
                          type="button"
                          role="tab"
                          aria-controls="pills-Livestock"
                          aria-selected="false"
                        >
                          Livestock
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content mt-3" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-MostActive"
                      role="tabpanel"
                      aria-labelledby="pills-MostActive-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th> Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {setCommodity?.map((item, index) => (
                              <>
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item?.name ? item?.name : "--"}</td>
                                  <td>{item?.current_price !== null ? item?.current_price.toFixed(2) : "--"}</td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " : item?.price_change_from_prev_close < 0
                                        ? "danger"
                                        : "success"

                                        }`}
                                    >
                                      {item?.price_change_from_prev_close
                                        ? Math.abs(item?.price_change_from_prev_close)?.toFixed(
                                          2
                                        )
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-Energy"
                      role="tabpanel"
                      aria-labelledby="pills-Energy-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {energyCommodity?.map((item, index) => (
                              <>
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item?.name ? item.name : "--"}</td>
                                  <td>{item?.current_price ? item?.current_price.toFixed(2) : "--"}</td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close
                                        ? Math.abs(item?.price_change_from_prev_close)?.toFixed(
                                          2
                                        )
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-Metals"
                      role="tab"
                      aria-labelledby="pills-Metals-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {metalCommodity?.map((item, index) => (
                              <>
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item?.name ? item?.name : "--"}</td>
                                  <td>{item?.current_price ? item?.current_price.toFixed(2) : "--"}</td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close
                                        ? Math.abs(item?.price_change_from_prev_close)?.toFixed(
                                          2
                                        )
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-Agriculture"
                      role="tab"
                      aria-labelledby="pills-Agriculture-tab"
                    >
                      <div className="table-responsive tabalignn custom-table">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {agriCommodity?.map((item, index) => (
                              <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                <td className="word">
                                  {item?.symbol ? item?.symbol : "--"}
                                </td>
                                <td>{item?.name ? item.name : "--"}</td>
                                <td>{item?.current_price ? item?.current_price.toFixed(2) : "--"}</td>
                                <td>
                                  <div
                                    className={`text-${item?.price_change_from_prev_close == null ? " " :
                                      item?.price_change_from_prev_close < 0
                                        ? "danger"
                                        : "success"
                                      }`}
                                  >
                                    {item?.price_change_from_prev_close
                                      ? Math.abs(item?.price_change_from_prev_close)?.toFixed(
                                        2
                                      )
                                      : "--"}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-Livestock"
                      role="tab"
                      aria-labelledby="pills-Livestock-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {liveCommodity?.map((item, index) => (
                              <>
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item?.name ? item?.name : "--"}</td>
                                  <td>{item?.current_price ? item?.current_price.toFixed(2) : "--"}</td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close
                                        ? Math.abs(item?.price_change_from_prev_close)?.toFixed(
                                          2
                                        )
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table ETFMovers_table_area">
                  <h2 className="chart-color Heading_content_hp px-0 pl-0">
                    ETF movers
                  </h2>
                  <div className="table-responsive ">
                    <ul
                      className="nav nav-pills mb-2"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link btn_main_hp active"
                          id="pills-ETFActive-tab"
                          data-toggle="pill"
                          data-target="#pills-ETFActive"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Most active
                        </button>
                      </li>
                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-ETFGainers-tab"
                          data-toggle="pill"
                          data-target="#pills-ETFGainers"
                          type="button"
                          role="tab"
                          aria-controls="pills-ETFGainers"
                          aria-selected="false"
                        >
                          Gainers
                        </button>
                      </li>
                      <li className="nav-item " role="presentation">
                        <button
                          className="nav-link btn_main_hp"
                          id="pills-ETFLosers-tab"
                          data-toggle="pill"
                          data-target="#pills-ETFLosers"
                          type="button"
                          role="tab"
                          aria-controls="pills-ETFLosers"
                          aria-selected="false"
                        >
                          Losers
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content mt-3" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-ETFActive"
                      role="tabpanel"
                      aria-labelledby="pills-ETFActive-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="4" className="text-center py-5">
                                  <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : etfData && etfData.length > 0 ? (
                              etfData?.map((item, index) => (
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item.name ? item?.name : "--"}</td>
                                  <td>
                                    {item?.current_price
                                      ? item?.current_price
                                      : "--"}
                                  </td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close !== null
                                        ? Math.abs(
                                          item?.price_change_from_prev_close
                                        ).toFixed(2)
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center py-5">
                                  <p
                                    className="text-center py-5"
                                    style={{
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    No Record Found
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-ETFGainers"
                      role="tabpanel"
                      aria-labelledby="pills-ETFGainers-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="4" className="text-center py-5">
                                  <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : etfGainer && etfGainer.length > 0 ? (
                              etfGainer?.map((item, index) => (
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)}>
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item.name ? item?.name : "--"}</td>
                                  <td>
                                    {item?.current_price
                                      ? item?.current_price
                                      : "--"}
                                  </td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close !== null
                                        ? Math.abs(
                                          item?.price_change_from_prev_close
                                        ).toFixed(2)
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center py-5">
                                  <p
                                    className="text-center py-5"
                                    style={{
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    No Record Found
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-ETFLosers"
                      role="tab"
                      aria-labelledby="pills-ETFLosers-tab"
                    >
                      <div className="table-responsive tabalignn custom-table ">
                        <table
                          className="table"
                          style={{
                            backgroundColor: "#020134",
                            color: "white",
                          }}
                        >
                          <thead>
                            <tr>
                              <th className=""> </th>
                              <th> </th>
                              <th>Price</th>
                              <th>Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="3" className="text-center py-5">
                                  <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : etfDecliner && etfDecliner.length > 0 ? (
                              etfDecliner?.map((item, index) => (
                                <tr key={index} onClick={()=>handleNavigate(item?.symbol)} >
                                  <td className="word">
                                    {item?.symbol ? item?.symbol : "--"}
                                  </td>
                                  <td>{item.name ? item?.name : "--"}</td>
                                  <td>
                                    {item?.current_price
                                      ? item?.current_price
                                      : "--"}
                                  </td>
                                  <td>
                                    <div
                                      className={`text-${item?.price_change_from_prev_close == null ? " " :
                                        item?.price_change_from_prev_close < 0
                                          ? "danger"
                                          : "success"
                                        }`}
                                    >
                                      {item?.price_change_from_prev_close !== null
                                        ? Math.abs(
                                          item?.price_change_from_prev_close
                                        ).toFixed(2)
                                        : "--"}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center py-5">
                                  <p
                                    className="text-center py-5"
                                    style={{
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    No Record Found
                                  </p>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table">
                  <h2 className="chart-color Heading_content_hp px-0">Cryptos</h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className=""> </th>
                          <th>Price</th>
                          <th>Change</th>
                          <th>% Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : cryptoData && cryptoData.length > 0 ? (
                          cryptoData?.map((item, index) => (
                            <tr key={index} >
                              <td className="word">
                                {item?.symbol ? item?.symbol : "--"}
                              </td>
                              <td>
                                {item.current_price ? item?.current_price : "--"}
                              </td>
                              <td>
                                <div
                                  className={`text-${item?.price_change_from_prev_close == null ? " " :
                                    item?.price_change_from_prev_close < 0
                                      ? "danger"
                                      : "success"
                                    }`}
                                >
                                  {item?.price_change_from_prev_close !== null
                                    ? Math.abs(
                                      item?.price_change_from_prev_close
                                    ).toFixed(2)
                                    : "--"}
                                </div>
                              </td>
                              <td>
                                <div
                                  className={`text-${item?.percent_change_from_prev_close == null ? " " :
                                    item?.percent_change_from_prev_close < 0
                                      ? "danger"
                                      : "success"
                                    }`}
                                >
                                  {item?.percent_change_from_prev_close !== null
                                    ? Math.abs(
                                      item?.percent_change_from_prev_close * 100
                                    ).toFixed(2)
                                    : "--"}
                                  %
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <p
                                className="text-center py-5"
                                style={{
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                }}
                              >
                                No Record Found
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table">
                  <h2 className="chart-color Heading_content_hp px-0">Currencies</h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className=""> </th>
                          <th>Rate</th>
                          <th>Change</th>
                          <th>% Change</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : currencyData && currencyData.length > 0 ? (
                          currencyData?.map((item, index) => (
                            <tr key={index} >
                              <td className="word">
                                {item?.symbol ? item?.symbol : "--"}
                              </td>
                              <td>
                                {item.current_price
                                  ? item?.current_price.toFixed(4)
                                  : "--"}
                              </td>
                          
                              <td>
                                <div
                                  className={`text-${item?.price_change_from_prev_close == null ? " " :
                                    item?.price_change_from_prev_close < 0
                                      ? "danger"
                                      : "success"
                                    }`}
                                >
                                  {item?.price_change_from_prev_close !== null
                                    ? Math.abs(
                                      item?.price_change_from_prev_close
                                    ).toFixed(2)
                                    : "--"}
                                </div>
                              </td>
                              <td>
                                <div
                                  className={`text-${item?.percent_change_from_prev_close == null ? " " :
                                    item?.percent_change_from_prev_close < 0
                                      ? "danger"
                                      : "success"
                                    }`}
                                >
                                  {item?.percent_change_from_prev_close !== null
                                    ? Math.abs(
                                      item?.percent_change_from_prev_close * 100
                                    ).toFixed(2)
                                    : "--"}
                                  %
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <p
                                className="text-center py-5"
                                style={{
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                }}
                              >
                                No Record Found
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 mb-4">
                <div className="MainDashboard_Chart_item  EconomicCalendar_MainDashboard_table">
                  <h2 className="chart-color Heading_content_hp px-0">
                    Bonds & rates
                  </h2>
                  <div className="table-responsive tabalignn custom-table ">
                    <table
                      className="table"
                      style={{
                        backgroundColor: "#020134",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className=""> </th>
                          <th>Yield</th>
                          <th>Yield change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="3" className="text-center py-5">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : bondRatesData && bondRatesData.length > 0 ? (
                          bondRatesData?.map((item, index) => (
                            <tr key={index}>
                              <td>{item?.time_span ? item?.time_span : "--"}</td>
                              <td>
                                {item?.summary_yield
                                  ? item?.summary_yield.toFixed(3)
                                  : "--"}
                                %
                              </td>
                              <td>
                                {" "}
                                <div
                                  className={`text-${item?.price_change_from_prev_close == null ? " " : item?.price_change_from_prev_close > 0
                                    ? "success"
                                    : "danger"
                                    }`}
                                >
                                  {item?.price_change_from_prev_close !== null
                                    ? item?.price_change_from_prev_close.toFixed(
                                      3
                                    )
                                    : "--"}
                                </div>{" "}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center py-5">
                              <p
                                className="text-center py-5"
                                style={{
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                }}
                              >
                                No Record Found
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
        {  isModalOpen &&  < Modal/>}
    </>
  );
}

export default WithAuth(MainDashboard);
