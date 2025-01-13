import apiHandle from "../services/ApiHandle";
const apiUrl = process.env.REACT_APP_API_URL;

const GET_Holiday_Sandtradinghours = `${apiUrl}/dashboard/holidaysandtradinghours`;
const GET_Market_Summarysnapshot = `${apiUrl}/dashboard/marketsummarysnapshot`;

const GET_Market_Summary = `${apiUrl}/dashboard/marketsummary?stock=SPY,QQQ,IWM,DIA&crypto=BTCUSD`;

 const GET_Market_Performance = `${apiUrl}/dashboard/marketperformance?ticker=SPY,QQQ,DIA,IWM`;
const GET_Premarket = `${apiUrl}/dashboard/premarket`;
const GET_wallstreetbets = `${apiUrl}/dashboard/wallstreetbets`;
const GET_Companyquote = `${apiUrl}/dashboard/companyquote`;
const GET_Earningcalendar = `${apiUrl}/dashboard/earningcalendar?startDate=2023-11-05&endDate=2023-11-11`;
const GET_Upgradesdowngradesfeed = `${apiUrl}/dashboard/upgradesdowngradesfeed`;

const GET_callratio = `${apiUrl}/dashboard/callratio`;
const GET_Fundamentals = `${apiUrl}/dashboard/fundamentals`;
const GET_Dividendscalendar = `${apiUrl}/dashboard/dividendscalendar?startDate=2023-11-05&endDate=2023-11-11`;
const GET_Ipocalendar = `${apiUrl}/dashboard/ipocalendar?startDate=2023-11-05&endDate=2023-11-11`;
const GET_Economiccalendar = `${apiUrl}/dashboard/economiccalendar?startDate=2023-11-05&endDate=2023-11-11`;
const GET_Adminmessage = `${apiUrl}/api/admin_other_messages`;
const GET_Cryptocurrency = `${apiUrl}/api/cryptocurrency`;
const GET_Forex = `${apiUrl}/api/forex`;
const Post_Contact_Form = `${apiUrl}/api/contact_form`;
const GET_Discord_Channels = `${apiUrl}/api/discord_channels`;
const GET_Forgot_Passsword = `${apiUrl}/api/otp_request`;
const GET_Verify_Otp = `${apiUrl}/api/verify_otp`;
const GET_Reset_Password = `${apiUrl}/api/reset_password`;
const NEWSLetterSubscribe = `${apiUrl}/api/save_email`;
const Journal = `${apiUrl}/api/journal_file`;
const Get_Journal = `${apiUrl}/api/journal_file`;
// const Get_EconomicCalender = `${apiUrl}/api/economic`;
const Get_EconomicCalender = `${apiUrl}/api/economic_calender_cnn`;
const Get_FearAndGreed  =  `${apiUrl}/api/fear_and_greed`;
const Get_commodityData = `${apiUrl}/api/commodities?symbol=CL00-USA:D,BZC00-USA:D,NG00-USA:D,GC00-USA:D,SI00-USA:D,S00-USA:D`;

const Get_commodityEnergyData = `${apiUrl}/api/commodities?symbol=CL00-USA:D,BZC00-USA:D,NG00-USA:D,RB00-USA:D,HO00-USA:D`;
const Get_commodityAgriData = `${apiUrl}/api/commodities?symbol=S00-USA:D,W00-USA:D`;
const Get_commodityMetalData = `${apiUrl}/api/commodities?symbol=GC00-USA:D,SI00-USA:D,PL00-USA:D,HG00-USA:D`;
const Get_commodityLiveData = `${apiUrl}/api/commodities?symbol=LH00-USA:D,LC00-USA:D,FC00-USA:D`;





const Get_EtfData =  `${apiUrl}/api/etfs?type=actives`
const Get_Crypto =  `${apiUrl}/api/crypto_cnn?symbol=NCI-NAS,BTCUSD-BITS,ETHUSD-BITS,LTCUSD-BITS,XRPUSD-BITS`
const GET_Currency =  `${apiUrl}/api/currency_cnn?symbol=EURUSD-FX2,GBPUSD-FX2,USDCAD-FX2,USDCHF-FX2,USDJPY-FX2`
const GET_BondRates =  `${apiUrl}/api/bond_rates?symbol=US03M-TU1,US02YY-TU1,US05YY-TU1,US10YY-TU1,US30YY-TU1`

const Get_EtfGainer =  `${apiUrl}/api/etfs?type=gainers`
const Get_EtfDecliners =  `${apiUrl}/api/etfs?type=decliners`

const Delete_post = `${apiUrl}/api/post`


const Get_Jcoop =  `${apiUrl}/jcoop_watchlist`
const Get_Livi =  `${apiUrl}/livi_watchlist`
const Get_Others =  `${apiUrl}/others_watchlist`

const Get_Jcoopnews =  `${apiUrl}/dashboard/companynews`
const Get_Livinews =  `${apiUrl}/dashboard/companynews`
const Get_Othersnews =  `${apiUrl}/dashboard/companynews`

const Post_Daily = `${apiUrl}/watchlist`
const Post_Other = `${apiUrl}/others_watchlist`
const Post_Livi = `${apiUrl}/livi_watchlist`

const Post_Jcoop = `${apiUrl}/jcoop_watchlist`

const GetVerificationCode = `${apiUrl}/api/verify_code`
const ThCoinFrom = `${apiUrl}/api/send_details`


const postThCoinFrom = (data) => {
  return apiHandle.post(`${ThCoinFrom}`, data);
};




const postVerifyCode = (data) => {
  return apiHandle.post(`${GetVerificationCode}`, data);
};




const addOtherData = (data) => {

  return apiHandle.post(`${Post_Other}`,data);
};

const deleteOther = (uid,sym) => {
  return apiHandle.delete(`${Post_Other}?uid=${uid}&symbol=${sym}`);
};


const addLiviData = (data) => {

  return apiHandle.post(`${Post_Livi}`,data);
};

const deleteLivi = (uid,sym) => {
  return apiHandle.delete(`${Post_Livi}?uid=${uid}&symbol=${sym}`);
};


const addJcoopData = (data) => {

  return apiHandle.post(`${Post_Jcoop}`,data);
};

const deleteJcoop = (uid,sym) => {
  return apiHandle.delete(`${Post_Jcoop}?uid=${uid}&symbol=${sym}`);
};
const postJcoop = (data) => {
  return apiHandle.post(`${Post_Jcoop}`);
};

const getJcoopnewsData = (ticker,limit=10) => {
  return apiHandle.get(`${Get_Jcoopnews}?tickers=${ticker}&limit=${limit}`);
};
const getLivinewsData = (ticker,limit=10) => {
  return apiHandle.get(`${Get_Livinews}?tickers=${ticker}&limit=${limit}`);
};
const getOthersnewsData = (ticker,limit=10) => { 
  return apiHandle.get(`${Get_Othersnews}?tickers=${ticker}&limit=${limit}`);
};

const getJcoopData = () => {
  return apiHandle.get(`${Get_Jcoop}?apikey=95ebc295745ab6341ebdd7539320dcd8`);
};

const getLiviData = () => {
  return apiHandle.get(`${Get_Livi}?apikey=95ebc295745ab6341ebdd7539320dcd8`);
};
const getOthersData = () => {
  return apiHandle.get(`${Get_Others}?apikey=95ebc295745ab6341ebdd7539320dcd8`);
};

const deletePost = (uid,post_id) => {
  return apiHandle.delete(`${Delete_post}?uid=${uid}&post_id=${post_id}`);
};

const getCommodityEnergyData = () => {
  return apiHandle.get(`${Get_commodityEnergyData}`);
};

const getCommodityAgriData = () => {
  return apiHandle.get(`${Get_commodityAgriData}`);
};


const getCommodityMetalData = () => {
  return apiHandle.get(`${Get_commodityMetalData}`);
};


const getCommodityLiveStockData = () => {
  return apiHandle.get(`${Get_commodityLiveData}`);
};





const getEtfGainer = () => {
  return apiHandle.get(`${Get_EtfGainer}`);
};

const getEtfDecliner = () => {
  return apiHandle.get(`${Get_EtfDecliners}`);
};



const getEtfData = () => {
  return apiHandle.get(`${Get_EtfData}`);
};
 


const getCryptoData = () => {
  return apiHandle.get(`${Get_Crypto}`);
};
 

const getCurrency = () => {
  return apiHandle.get(`${GET_Currency}`);
};
 

const getBondratesData = () => {
  return apiHandle.get(`${GET_BondRates}`);
};
 


const getCommodityData = () => {
  return apiHandle.get(`${Get_commodityData}`);
};



const getFearAndGreed = () => {
  return apiHandle.get(`${Get_FearAndGreed}`);
};


const getEconomicCalendarData = (currentDate,limit,page) => {
  return apiHandle.get(`${Get_EconomicCalender}?${currentDate}&limit=${limit}&page=${page}`);
};

const getRobinhood = (uid,page,date) => {
  return apiHandle.get(`${Get_Journal}?uid=${uid}&type=robinhood&limit=20&page=${page}&search=${date}`);
};

const getTradovate = (uid,page,date) => {
  return apiHandle.get(`${Get_Journal}?uid=${uid}&type=tradovate&limit=20&page=${page}&search=${date}`);
};

const postJournal = (data,type) => {
  const formData = new FormData();
  formData.append("file",data);
  formData.append("uid", localStorage.getItem("uid"))
  formData.append("type",type)
  return apiHandle.post(`${Journal}`, formData,{
     headers:{
      "Content-Type":"multipart/formData"
     }
  });
};



const postForgot = (data) => {
  return apiHandle.post(`${GET_Forgot_Passsword}`, data);
};
const postVerifyOtp = (data) => {
  return apiHandle.post(`${GET_Verify_Otp}`, data);
};
const postSignUpVerifyOtp = (data) => {
  return apiHandle.post(`${apiUrl}/api/verify`, data);
};
const postResetPassword = (data) => {
  return apiHandle.post(`${GET_Reset_Password}`, data);
};

const newsLetterSubscribe = (email) => {
  return apiHandle.post(`${NEWSLetterSubscribe}`, { email });
};

const getDiscordChannels = () => {
  return apiHandle.get(`${GET_Discord_Channels}`);
};
const postContactform = (data) => {
  return apiHandle.post(`${Post_Contact_Form}`, data);
};

const getHolidaysandtradinghours = () => {
  return apiHandle.get(`${GET_Holiday_Sandtradinghours}`);
};

const getMarketsummarysnapshot = (stock, crypto) => {
  return apiHandle.get(`${GET_Market_Summarysnapshot}?stock=${stock}`);
};


const getMarketsummary = () => {
  return apiHandle.get(
    `${GET_Market_Summary}`
  );
};



const getMarketperformance = () => {
  return apiHandle.get(
    `${GET_Market_Performance}`
  );
};
const getPremarket = () => {
  return apiHandle.get(`${GET_Premarket}`);
};

const getwallstreetbets = () => {
  return apiHandle.get(`${GET_wallstreetbets}`);
  
};
const getCompanyquote = (ticker) => {
  return apiHandle.get(`${GET_Companyquote}?ticker=${ticker}`);
};
const getEarningcalendar = () => {
  return apiHandle.get(`${GET_Earningcalendar}`);
};
const getUpgradesdowngradesfeed = () => {
  return apiHandle.get(`${GET_Upgradesdowngradesfeed}`);
};
const getCallratio = (exchanges) => {
  return apiHandle.get(`${GET_callratio}?exchanges=${exchanges}`);
};
const getFundamentals = (ticker) => {
  return apiHandle.get(`${GET_Fundamentals}?ticker=${ticker}`);
};
const getDividendscalendar = (exchanges) => {
  return apiHandle.get(`${GET_Dividendscalendar}?exchanges=${exchanges}`);
};
const getIpocalendar = (exchanges) => {
  return apiHandle.get(`${GET_Ipocalendar}?exchanges=${exchanges}`);
};
const getEconomiccalendar = (exchanges) => {
  return apiHandle.get(`${GET_Economiccalendar}?exchanges=${exchanges}`);
};
const getAdminmessage = () => {
  return apiHandle.get(`${GET_Adminmessage}`);
};
const getCryptocurrency = () => {
  return apiHandle.get(`${GET_Cryptocurrency}`);
};
const getForex = () => {
  return apiHandle.get(`${GET_Forex}`);
};

const postLivi = (data) => {
  return apiHandle.post(`${Post_Livi}`, data);
};

const postOthers = (data) => {
  return apiHandle.post(`${Post_Other}`, data);
};

const postDaily = (data) => {
  return apiHandle.get(`${Post_Daily}`, data);
};

export {
  postThCoinFrom,
  postVerifyCode,
  addOtherData,
  deleteOther,
  deleteLivi,
  addLiviData,
  addJcoopData,
  deleteJcoop,
  getCommodityEnergyData,getCommodityAgriData,getCommodityMetalData,getCommodityLiveStockData,
  getEtfGainer,getEtfDecliner,
  getEtfData,getCurrency,getBondratesData,
  getCryptoData,
  getCommodityData,
  getFearAndGreed,
  getEconomicCalendarData,
  getHolidaysandtradinghours,
  getMarketsummarysnapshot,
  getMarketsummary,
  getMarketperformance,
  getPremarket,
  getwallstreetbets,
  getCompanyquote,
  getEarningcalendar,
  getUpgradesdowngradesfeed,
  getCallratio,
  getFundamentals,
  getDividendscalendar,
  getIpocalendar,
  getEconomiccalendar,
  getAdminmessage,
  getCryptocurrency,
  getForex,
  postContactform,
  getDiscordChannels,
  postForgot,
  postVerifyOtp,
  postResetPassword,
  postSignUpVerifyOtp,
  newsLetterSubscribe,
  postJournal,getTradovate,getRobinhood,deletePost,
  getJcoopData,getLiviData,getOthersData,
  getJcoopnewsData,getLivinewsData,getOthersnewsData,
  postJcoop,postLivi,postOthers,postDaily,
};
