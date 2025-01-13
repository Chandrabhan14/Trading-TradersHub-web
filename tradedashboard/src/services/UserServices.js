import apiHandle from "../services/ApiHandle";
import apiHandleD from "./ApiHandle2";
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const GET_Stock_Market_Top_Gainers = `${apiUrl}/stock_market/gainers`;
const GET_Stock_Market_Top_Activers = `${apiUrl}/stock_market/actives`;
const GET_Sector_Performers = `${apiUrl}/sector-performance`;
const GET_Stock_Market_Top_Losers = `${apiUrl}/stock_market/losers`;
const GET_Stock_News = `${apiUrl}/trending`;
const GET_Ticker_Bar = `${apiUrl}/ticker_bar`;
const GET_Watch_List = `${apiUrl}/watchlist`;

const GET_Th_Bot = `${apiUrl}/api/admin_data`;
const POST_Google_Signin = `${apiUrl}/google_signin`;
const GET_Stocks = `${apiUrl}/stock_news`;
const GET_Crypto = `${apiUrl}/news/crypto`;
const GET_FMP = `${apiUrl}/news/fmp`;
const GET_Forex = `${apiUrl}/news/forex`;
const GET_General = `${apiUrl}/news/general`;
const GET_Search_Result = `${apiUrl}/api/search?`;
const POST_Create_Portfolio = `${apiUrl}/api/portfolio`;
const UPDATE_Portfolio = `${apiUrl}/api/portfolio`;
const DELETE_Portfolio = `${apiUrl}/api/portfolio`;
const GET_Portfolios = `${apiUrl}/api/portfolio`;
const GET_Portfolio_Assets = `${apiUrl}/api/asset`;
const POST_Papertrading_Stock = `${apiUrl}/api/transaction`;

const GET_52_Week_High = `${apiUrl}/api/api/52week?limit=99999&sortColumn=symbol&sortOrder=ASC&queryString=exchange%3Dq%7Cstatus%3DHi`;
const GET_52_Week_Low = `${apiUrl}/api/52week`;
const POST_Personal_Bot_Config = `${apiUrl}/api/welcome_msg`;
const GET_My_Subscription = `${apiUrl}/api/followers_post`;
const POST_User_Post = `https://api.tradershub.ninja/api/post`;
const POST_Btn_Status = `${apiUrl}/api/follow`;
const GET_Short_List = `${apiUrl}/api/short_interest`;
const GET_All_Users = `${apiUrl}/api/all_profile`;
const GET_All_Posts = `${apiUrl}/api/profile_post`;
const GET_ForexData = `${apiUrl}/api/forex`;
const GET_UserData = `${apiUrl}/api/edit_user_profile`;
const Chat_ChannelData = `${apiUrl}/api/pubnub_channels`
const subscription_follow = `${apiUrl}/api/follow`
const GET_tickerList = `${apiUrl}/api/ticker_list?search=`
const Get_Option_FlowData =  `${apiUrl}/api/option_flow?`
const GET_chat_time =  `${apiUrl}/api/get_time_stamp`
const GET_search_news =  `${apiUrl}/api/search_news?ticker=`
const GET_search_financials =  `${apiUrl}/api/search_financials?ticker=`
const Get_timeToken =  `${apiUrl}/api/pubnub_channels`
const Get_allStocks = `${apiUrl}/api/all_stocks`
const Post_myFavStocks = `${apiUrl}/api/favorite_stocks`
const Get_myFavStocks = `${apiUrl}/api/favorite_stocks`
const Get_myFavStockNews = `${apiUrl}/api/favorite_stock_news`
const Get_searchStockNews = `${apiUrl}/api/favorite_search_news`
const Get_searchFavstock = `${apiUrl}/api/search_stocks`


const post_customSignup = `${apiUrl}/api/tenant_signup`
const Get_tickerPost = `${apiUrl}/api/feed`

const post_userPost = `${apiUrl}/api/post`

const others_feed = `${apiUrl}/api/others_feed`
const jcoop_feed = `${apiUrl}/api/jcoop_feed`
const livi_feed = `${apiUrl}/api/livi_feed`

const option_world = `${apiUrl}/api/option_messages`

const blog_post = `${apiUrl}/api/blog`
const predictionSymbol = `${apiUrl}/api/prediction_symbols_list`

const predictionSymbolData = `${apiUrl}/api/prediction_symbol_values`

const predictionPost= `${apiUrl}/api/prediction`
const adminPost_delete= `${apiUrl}/api/blog`
const predictionSearch= `${apiUrl}/api/prediction_symbol_search`
const globalSearchSuggestion= `${apiUrl}/api/stocks_list`
const getscorePridiction= `${apiUrl}/api/get_score`
const getStock_Current_Value= `${apiUrl}/api/current_price`
const getAiPrediction= `${apiUrl}/api/closing_price_prediction`
const get_EducationVideos= `${apiUrl}/api/education_videos`
const post_Educational_video = `${apiUrl}/api/education_videos`
const get_company_performance = `${apiUrl}/api/company_performance`
const post_lower_price = `${apiUrl}/api/get_desired_price`
const bot_Alerts = `${apiUrl}/api/get_bot_alerts`
const get_followers_number = `${apiUrl}/api/get_followers_number`
const post_refresh_token = `${apiUrl}/api/token/refresh`

const Bot_feed = `${apiUrl}/api/feed_messages`
const scannerFilter = `${apiUrl}/api/get_scanner_options_list`
const stockScanerGet = `${apiUrl}/stock_screener`
const savedFilter = `${apiUrl}/api/save_filters`
const savedFilterGet = `${apiUrl}/api/save_filters`
const savedFilterDelete = `${apiUrl}/api/save_filters`
const LongTerm_Saved = `${apiUrl}/api/long_term`
const LongTerm = `${apiUrl}/api/long_term`
const LongTermDelete = `${apiUrl}/api/long_term`

const getStockScannerDropdown = ( ) => {

    return apiHandle.get(`${stockScanerGet}`);
    };

const deleteLongTermData = (uid ,sym) => {

    return apiHandle.delete(`${LongTermDelete}?uid=${uid}&ticker=${sym}`);
    };

const longTermGet = async (filterData) => {
  
    return apiHandle.get(`${LongTerm}`,filterData);
    };

const longTermPost = async (filterData) => {
  
    return apiHandle.post(`${LongTerm_Saved}`,filterData);
    };

const saveFilter = async (filterData) => {
  
return apiHandle.post(`${savedFilter}`,filterData);
};

const getSavedFilters = async (uid) => {
     
return apiHandle.get(`${savedFilter}?uid=${uid}`);
};

const deleteFilter = async ({uid, created_at}) => {
    return apiHandle.delete(`${savedFilter}?uid=${uid}&created_at=${created_at}`);
};


const StockScannerGetapi = (filters,selectedOption,order) => {
    
    const payload = {
      filters, // Pass the filters object directly
      limit: 10,
      page: 1,
      order_by:selectedOption,
      order
    };
  
    return apiHandleD.post(`${stockScanerGet}`, payload);
  };
  
  


// const ScannerFilterApi = (options) => {

// return apiHandle.get(`${scannerFilter}?option=${options}`);
// };
const ScannerFilterApi = (filtersList) => {
  // Encode each filter option to ensure the query string is correctly formatted
  const query = filtersList
      .map(filter => encodeURIComponent(filter))
      .join(',');
  return apiHandle.get(`${scannerFilter}?option=${query}`);
};


const getBotFeed = (page,limit) => {

return apiHandle.get(`${Bot_feed}?page=${page}&limit=${limit}`);
};


const postRefershToken = (data) => {

return apiHandle.post(`${post_refresh_token}`,data);
};


const getFollowersNumber = (uid,page,limit) => {

return apiHandle.get(`${get_followers_number}?uid=${uid}&page=${page}&limit=${limit}`);
};

const addWatchListData = (data) => {

return apiHandle.post(`${GET_Watch_List}`,data);
};
const deleteWatchlistData = (uid ,sym) => {

return apiHandle.delete(`${GET_Watch_List}?uid=${uid}&symbol=${sym}`);
};
const BotAlerts = () => {
return apiHandle.get(`${bot_Alerts}`)
}

const lowerPriceAlert = (Obj) => {
return apiHandle.post(`${post_lower_price}`,Obj)
}

const aiCompanyPerformance = (symbol) => {
return apiHandle.get(`${get_company_performance}?symbol=${symbol}`)
}



const PostEducationalVideo = () => {
return apiHandle.post(`${get_EducationVideos}`);
};


const getEductionVideo = (uid) => {
return apiHandle.get(`${get_EducationVideos}?uid=${uid}`);
};

const aiPredictionData = (symbol) => {
return apiHandle.get(`${getAiPrediction}?symbol=${symbol}`)
}


const stockCurrentValue = (symbol) => {
return apiHandle.get(`${getStock_Current_Value}?symbol=${symbol}`)
}


const scorePridiction = () => {
return apiHandle.get(`${getscorePridiction}`)
}

const globalSearch = (symbol) => {
return apiHandle.get(`${globalSearchSuggestion}?ticker=${symbol}`)
}

const predictionSearchData = (symbol) => {
return apiHandle.get(`${predictionSearch}?symbol=${symbol}`)
}


const adminPostDelete = (id) => {
return apiHandle.delete(`${adminPost_delete}?post_id=${id}`)
}


const predictionPostData = (data) => {
return apiHandle.post(`${predictionPost}`,data)
}




const predictionSymData = (symbol) => {
return apiHandle.get(`${predictionSymbolData}?symbol=${symbol}&option=Close`)
}


const prediction = () => {
return apiHandle.get(`${predictionSymbol}`)
}


const blogGet = (page) => {

return apiHandle.get(`${blog_post}?page=${page}`)
}

const blogPost = (data) => {

return apiHandle.post(`${blog_post}`,data,{
    headers:{
     "Content-Type":"multipart/formData"
    }
})
}
const OptionMessages = (limit,pageFeed) => {

return apiHandle.get(`${option_world}?limit=${limit}&page=${pageFeed}`)
}

const jcoopFeedPosts = (limit,pageFeed) => {

return apiHandle.get(`${jcoop_feed}?limit=${limit}&page=${pageFeed}`)
}
const liviFeedPosts = (limit,pageFeed) => {

return apiHandle.get(`${livi_feed}?limit=${limit}&page=${pageFeed}`)
}


const otherFeedPosts = (ticker,limit,pageFeed) => {
return apiHandle.get(`${others_feed}?tickers=[${ticker}]&limit=${limit}&page=${pageFeed}`)
}
const userPosts = (data) => {

return apiHandle.post(`${post_userPost}`, data,{
    headers:{
     "Content-Type":"multipart/formData"
    }
});
};

const getStockFeeds = (ticker,limit,pageFeed) => {
return apiHandle.get(`${Get_tickerPost}?tickers=[${ticker}]&limit=${limit}&page=${pageFeed}`)
};

const postcustomSignup = (data) => {

return apiHandle.post(`${post_customSignup}`, data);
};

const getSearchfavstocks = (uid,search) => {
return apiHandle.get(`${Get_searchFavstock}?uid=${uid}&search=${search}`);
}

const getsearchstockNews = (uid,symbol,searchpage) => {
let url = `${Get_searchStockNews}?uid=${uid}&page=${searchpage}`
if(symbol){
    url += `&symbol=${symbol}`
}
return apiHandle.get(url);
};

const getAllstocks = (uid,page) => {
return apiHandle.get(`${Get_allStocks}?uid=${uid}&limit=10&page=${page}`);
};

const postmyFavStocks = (data) => {
return apiHandle.post(`${Post_myFavStocks}`, data);
};

const getmyFavStocks = (uid) => {
return apiHandle.get(`${Get_myFavStocks}?uid=${uid}&limit=10`);
};


const getmyFavStockNews = (uid,page) => {
return apiHandle.get(`${Get_myFavStockNews}?uid=${uid}&limit=10&page=${page}`);
};




const getTimeToken = (uid) => {
return apiHandle.get(`${Get_timeToken}?uid=${uid}`);
};


const getSearchNews = (symbol) => {
return apiHandle.get(`${GET_search_news}${symbol}`);
};

const getSearchFinancials = (ticker ) => {
return apiHandle.get(`${GET_search_financials}${ticker}`);
};


const getChatTime = (uid,time_stamp ) => {
console.log(time_stamp,"----> give timestamp");
return apiHandle.post(`${GET_chat_time}`, {
    uid,
    time_stamp,
});
};


const getOptionFlowData = (currentPage,limit,symbol = " " ) => {
return apiHandle.get(`${Get_Option_FlowData}page=${currentPage}&symbol=${symbol}&limit=${limit}`);
};

const getTickerList = (search) => {
return apiHandle.get(`${GET_tickerList}${search}`);
};

const getChatChannelData = (uid) => {
console.log(uid, "channel details in chat js:---");
return apiHandle.get(`${Chat_ChannelData}?uid=${uid}`);
};

const getSubscriptionFollow = (uid,follow_uid,action) => {
return apiHandle.post(`${subscription_follow}`,{
    uid,
    follow_uid,
    action
});
};

const getStockMarketTopActiversa = () => {
return apiHandle.get(`${GET_Stock_Market_Top_Activers}?apikey=${apiKey}`);
};
const postGoogleSignina = () => {
return apiHandle.get(`${POST_Google_Signin}?apikey=${apiKey}`);
};
const postCreatePortfolio = (portfolio) => {
return apiHandle.post(`${POST_Create_Portfolio}`, portfolio);
};

const updatePortfolio = (portfolio) => {
console.log(portfolio, "porfolio details in usersevices:---");
return apiHandle.patch(`${UPDATE_Portfolio}`, portfolio);
};

const deletePortfolio = (portfolio) => {
return apiHandle.delete(`${DELETE_Portfolio}`, { data: portfolio });
};

const getAllPortfolios = (uid,page) => {
return apiHandle.get(`${GET_Portfolios}?uid=${uid}&limit=10&page=${page}`);
};
const getStockMarketTopGainersa = () => {
return apiHandle.get(`${GET_Stock_Market_Top_Gainers}?apikey=${apiKey}`);
};

const getStockMarketTopLosersa = () => {
return apiHandle.get(`${GET_Stock_Market_Top_Losers}?apikey=${apiKey}`);
};

const getSectorPerformersa = () => {
return apiHandle.get(`${GET_Sector_Performers}?apikey=${apiKey}`);
};
const getStockNewsa = () => {
return apiHandle.get(`${GET_Stock_News}?apikey=${apiKey}`);
};
const getTickerBara = () => {
return apiHandle.get(`${GET_Ticker_Bar}?apikey=${apiKey}`);
};
const getStocksa = () => {
return apiHandle.get(`${GET_Stocks}?apikey=${apiKey}`);
};
const getCryptoa = () => {
return apiHandle.get(`${GET_Crypto}?apikey=${apiKey}`);
};
const getFMPa = () => {
return apiHandle.get(`${GET_FMP}?apikey=${apiKey}`);
};
const getForexa = () => {
return apiHandle.get(`${GET_Forex}?apikey=${apiKey}`);
};
const getGenerala = () => {
return apiHandle.get(`${GET_General}?apikey=${apiKey}`);
};
const getWatchLista = () => {
return apiHandle.get(`${GET_Watch_List}?apikey=${apiKey}`);
};
const getThBota = () => {
return apiHandle.get(`${GET_Th_Bot}`);
};
const createPersonalBot = (data) => {
return apiHandle.post(`${POST_Personal_Bot_Config}`, data);
};
const get52WeekHigh = (headerss) => {

return apiHandle.get(`${GET_52_Week_High}`, { headers: headerss });
};
const get52WeekLow = (headerss) => {
return apiHandle.get(`${GET_52_Week_Low}`);
};

const getFollowersPost = (uid,page) => {
return apiHandle.get(`${GET_My_Subscription}?uid=${uid}&page=${page}&limit=10`);
};
const getAllUsers = (uid,page) => {
return apiHandle.get(`${GET_All_Users}?uid=${uid}&limit=10&page=${page}`);
};

const getUserData = (uid) => {
return apiHandle.get(`${GET_UserData}?uid=${uid}`);
};

const editUserData = (uid,data) => {
return apiHandle.patch(`${GET_UserData}?uid=${uid}`,data);
};

const getAllPostsOfUser = (uid,page) => {
return apiHandle.get(`${GET_All_Posts}?uid=${uid}&limit=10&page=${page}`);
};
const getPortfolioAssets = (data,page) => {
return apiHandle.get(
    `${GET_Portfolio_Assets}?portfolio_name=${data.portfolioName}&uid=${data.uId}&limit=5&page=${page}`
);
};
const getSearchResult = (symbol) => {
return apiHandle.get(`${GET_Search_Result}ticker=${symbol}`);
};
const getNewsurl = (type, limit, page) => {
let url;
type === "small_cap_news"
    ? (url = `${apiUrl}/api/${type}?apikey=${apiKey}${
        limit ? `&limit=${limit}` : ""
     }${page ? `&page=${page}` : ""}`)
    : (url = `${apiUrl}/news/${type}?apikey=${apiKey}${
        limit ? `&limit=${limit}` : ""
     }${page ? `&page=${page}` : ""}`);
return url;
};


const getNewsUrl = (type, limit, page , accessToken) =>{
let Url;

switch (type) {
    case "stock":
     Url = `${apiUrl}/api/stock_news?apikey=${apiKey}&limit=${limit}&page=${page}`;
     break;
    case "general":
     Url = `${apiUrl}/api/general_news?apikey=${apiKey}&limit=${limit}&page=${page}`;
     break;
    case "crypto":
     Url = `${apiUrl}/api/crypto_news?apikey=${apiKey}&limit=${limit}&page=${page}`;
     break;
     case "forex":
     Url = `${apiUrl}/api/forex_news?apikey=${apiKey}&limit=${limit}&page=${page}`;
        break;
    case "small_cap_news":
     Url = `${apiUrl}/api/small_cap_news?apikey=${apiKey}&limit=${limit}&page=${page}`;
    
     break;




}
if (accessToken) {
Url += `&access_token=${accessToken}`;
}

return Url;
}




const getStockUrl = (type,from,to,currentPage,symbol,seach="",) => {
let Url;
console.log("FROM =>",from);
console.log("TO =>",to);
console.log("TO Symbol =>",symbol);



switch (type) {
    case "earnings":
     Url = `${apiUrl}/api/earning_calendar?startDate=${from}&endDate=${to}&exchanges=SPX,QQQ,DJX,OEX&date=1&page=${currentPage}&limit=20&categories=${seach}&symbol=${symbol}`
    
     break;
    case "ipo":
     Url = `${apiUrl}/api/ipo_calendar?startDate=${from}&endDate=${to}&exchanges=SPX,QQQ,DJX,OEX&date=1&page=${currentPage}&limit=10`;
     break;
    case "economic":
     Url = `${apiUrl}/api/economic_calendar?startDate=${from}&endDate=${to}&exchanges=SPX,QQQ,DJX,OEX&date=1&page=${currentPage}&limit=10&us_only=1`;
     break;
     case "worldEconomic":
        Url = `${apiUrl}/api/economic_calendar?startDate=${from}&endDate=${to}&exchanges=SPX,QQQ,DJX,OEX&date=1&page=${currentPage}&limit=10`;
        break;
    case "dividend":
     Url = `${apiUrl}/api/dividend_calendar?startDate=${from}&endDate=${to}&exchanges=SPX,QQQ,DJX,OEX&date=1&page=${currentPage}&limit=10`;
     if(symbol){
        Url += `&symbol=${symbol}`
     }
     break;
    
    default:
     Url = `${apiUrl}/dashboard/earningcalendar?startDate=2023-11-05&endDate=2023-11-11&exchanges=SPX,QQQ,DJX,OEX`;
     return;
} return Url
};



const postprofile = (data) => {

return apiHandle.post(`${POST_User_Post}`, data,{
         headers:{
         "Content-Type":"multipart/formData"
        }
     });

}


const postPapertradingStock = (data) => {
return apiHandle.post(`${POST_Papertrading_Stock}`, data);
};
const postUserPost = (data) => {

return apiHandle.post(`${POST_User_Post}`, data);
};
const getBtnStatus = (data) => {
return apiHandle.post(`${POST_Btn_Status}`, data);
};

const getShortList = (page,limit=20) => {
return apiHandle.get(`${GET_Short_List}?page=${page}&offset=${limit}`);
};

const getStockScannerDataUrl = (
marketCapMoreThan ,
marketCapLowerThan ,
betaMoreThan ,
betaLowerThan ,
volumeMoreThan ,
volumeLowerThan ,
sector1,
exchange1,
dividend1,
dividend2,
country,
priceMoreThan,
priceLowerThan

) => {
const params = new URLSearchParams({
    marketCapMoreThan,
    marketCapLowerThan,
    betaMoreThan,
    betaLowerThan,
    volumeMoreThan,
    volumeLowerThan,
    sector: sector1[0] || "",
    exchange: exchange1[0] || "",
    dividendMoreThan: dividend1,
    dividendLowerThan: dividend2,
    country: country,
    priceMoreThan,
    priceLowerThan
});
return `${apiUrl}/stock_screener?${params}&limit=100&apikey=${apiKey}`;
};

export {
    getStockScannerDropdown,
    deleteLongTermData,
    longTermGet,
    longTermPost,
    deleteFilter,
    getSavedFilters,
    saveFilter,
  StockScannerGetapi,
ScannerFilterApi,
getBotFeed,
postRefershToken,
getFollowersNumber,
addWatchListData,
deleteWatchlistData,
BotAlerts,
lowerPriceAlert,
aiCompanyPerformance,
PostEducationalVideo,
getEductionVideo,
aiPredictionData,
stockCurrentValue,
scorePridiction,
globalSearch,
predictionSearchData,
adminPostDelete,
predictionPostData,
predictionSymData,
prediction,
blogGet,
blogPost,
OptionMessages,
liviFeedPosts,
jcoopFeedPosts,
otherFeedPosts,
userPosts,
getStockFeeds,
postcustomSignup,
getSearchfavstocks,
getsearchstockNews,
getmyFavStockNews,
getmyFavStocks,
postmyFavStocks,
getTimeToken,
getSearchNews,
getSearchFinancials,
getChatTime,
postprofile,
getOptionFlowData,
getTickerList,
getSubscriptionFollow,
getChatChannelData,
getStockMarketTopActiversa,
getStockMarketTopGainersa,
getStockMarketTopLosersa,
getSectorPerformersa,
getStockNewsa,
getTickerBara,
getWatchLista,
getNewsUrl,
getStocksa,
getStockUrl,
getSearchResult,
postPapertradingStock,
getStockScannerDataUrl,
postGoogleSignina,
postCreatePortfolio,
getThBota,
getAllPortfolios,
updatePortfolio,
deletePortfolio,
getPortfolioAssets,
get52WeekHigh,
get52WeekLow,
createPersonalBot,
getFollowersPost,
postUserPost,
getBtnStatus,
getShortList,
getAllUsers,
getAllPostsOfUser,
getUserData,
editUserData,
getAllstocks,
};