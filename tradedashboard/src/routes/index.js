// Import necessary dependencies
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodaysMarket from "../components/dashboard-component/TodaysMarket";

import Bot from "../components/dashboard-component/Bot";
import journals from "../components/dashboard-component/journals";
import Tradovate from "../components/dashboard-component/Tradovate";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import ForgetPassword from "../components/auth/ForgetPassword";
import OTP from "../components/auth/OTP";
import ResetPassword from "../components/auth/ResetPassword";
import WatchList from "../components/dashboard-component/WatchList";
import DailyLevel from "../components/dashboard-component/DailyLevel";
import OptionsWorld from "../components/dashboard-component/OptionsWorld";
import MakePrediction from "../components/dashboard-component/MakePrediction";



import Indicator from "../components/dashboard-component/Indicator";
import Journal from "../components/dashboard-component/Journal";
import ProtectedRoute from "../components/dashboard-component/ProtectedRoute";
import PageNotFound from "../components/dashboard-component/PageNotFound";
import HelpSupport from "../components/dashboard-component/HelpSupport";
import Settings from "../components/dashboard-component/Settings";
import Subscription from "../components/dashboard-component/Subscription";
import Education from "../components/dashboard-component/Education";
import MyFavourite from "../components/dashboard-component/MyFavourite";
import MyFav from "../components/dashboard-component/MyFav";

import flow from "../components/dashboard-component/option/flow.js";

import Dashboardfront from "../pages/Dashboardfront";
import LaunchingPage from "../components/dashboard-component/LauncingPage";
import News from "../containers/News";
import Blog from "../containers/Blog";
import Calendar from "../containers/Calendar";
import MarketHoliday from "../containers/MarketHoliday";
import StockScanner from "../containers/StockScanner/StockScanner";
import StockSearches from "../containers/StockSearches/StockSearches";
import OtpVerification from "../components/auth/OtpVerification";
import AboutUs from "../pages/AboutUs";
import ThBotService from "../pages/ThBotService";
import Reviews from "../pages/Reviews";
import PrivacyPolicy from "../pages/Term.js";
import PaperTradingPortfolios from "../containers/Papertrading/PaperTradingPortfolios";
import PaperTradingStocks from "../containers/Papertrading/PaperTradingStocks";
import FollowerProfile from "../components/dashboard-component/FollowerProfile";
import Blogs from "../pages/Blogs";

import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";


import BlogOverview from "../pages/BlogOverview";
import Contact from "../pages/Contact";
import TradersHub from "../pages/TradersHub";
import Chart from "../components/dashboard-component/Chart";
import MySubscription from "../components/dashboard-component/MySubscription";
import Weeks52 from "../components/dashboard-component/Weeks52";
import MyProfile from "../components/dashboard-component/MyProfile";
import Plans from "../pages/Plans";
import Oct11 from "../pages/daily/oct/Oct11";
import Oct12 from "../pages/daily/oct/Oct12";
import Oct15 from "../pages/daily/oct/Oct15";
import Oct15e from "../pages/daily/oct/Oct15e";
import Oct17 from "../pages/daily/oct/Oct17";
import Oct18 from "../pages/daily/oct/Oct18";
import Nov5 from "../pages/daily/nov/nov5.js";


import Oct13 from "../pages/daily/oct/Oct13";
import ShortInterst from "../components/dashboard-component/ShortInterst";
import Oct16 from "../pages/daily/oct/Oct16";
import ConnectUs from "../components/dashboard-component/ConnectUs";
import Chat from "../containers/Chatting/Chat";
import MainDashboard from "../pages/MainDashboard.js";
import Forex from "../components/dashboard-component/Forex";
import CryptoPage from "../components/dashboard-component/CryptoPage";
import Others from "../components/dashboard-component/Others.js";
import Livi from "../components/dashboard-component/Livi.js";
import Jcoop from "../components/dashboard-component/Jcoop.js";
import NinjaWorld from "../components/dashboard-component/NinjaWorld.js";
import Admin from "../admin/Admin.js";
import ThBot from "../components/dashboard-component/ThBot.js";
import MyFollowers from "../components/dashboard-component/myFollowers.js";

import VerifyPhoneOtp from "../components/auth/VerifyPhoneOtp.js";
import THFeeds from "../components/dashboard-component/THFeeds.js";
import Th_coin from "../pages/Th_coin.js";
import LongTerm from "../components/dashboard-component/LongTerm.js";
// Create the routing component
const Router = () => {



  const protectedRoutes = [
    { path: "/bot", component: Bot },
    { path: "/Robinhood", component: journals },
    { path: "/Tradovate", component: Tradovate },
    { path: "/watchlist", component: WatchList },
    { path: "/Jcoop", component: Jcoop },
    { path: "/Livi", component: Livi },
    { path: "/Others", component: Others },
    { path: "/THFeeds", component: THFeeds },


    { path: "/DailyLevel", component: DailyLevel },
    { path: "/OptionsWorld", component: OptionsWorld },
    { path: "/ninjaWorld", component: NinjaWorld },
    { path: "/todays-market", component: TodaysMarket },
    { path: "/52-weeks", component: Weeks52 },
    { path: "/short-interest", component: ShortInterst },
    { path: "/paper-trading", component: PaperTradingPortfolios },
    { path: "/paper-stocks/:stocks", component: PaperTradingStocks },
    { path: "/education", component: Education },
    { path: "/MyFavourite", component: MyFavourite },
    { path: "/MyFav", component: MyFav },

    { path: "/flow", component: flow },



    { path: "/my-followers", component: MyFollowers },
    { path: "/follower-profile", component: FollowerProfile },
    { path: "/my-profile", component: MyProfile },
    { path: "/stock-scanner", component: StockScanner },
    { path: "/journal", component: Journal },
    { path: "/indicator", component: Indicator },
    { path: "/help-support", component: HelpSupport },
    { path: "/calendar", component: Calendar },
    { path: "/subscription", component: Subscription },
    { path: "/blogs", component: Blog },
    { path: "/launching", component: LaunchingPage },
    { path: "/news/:type", component: News },
    { path: "/settings", component: Settings },
    { path: "/holidays", component: MarketHoliday },
    { path: "/my-subscription", component: MySubscription },

    { path: "/MakePrediction", component: MakePrediction },

    { path: "/MainDashboard", component: MainDashboard },
    { path: "/chart", component: Chart },
    { path: "/forex_data", component: Forex },
    { path: "/cryptocurrency", component: CryptoPage },
    { path: "/AdminPost", component: Admin },
    { path: "/ThBot", component: ThBot },
    { path: "/Long-Term", component: LongTerm },

  ];

  const generateProtectedRoutes = () => {
    return protectedRoutes.map((route) => (
      <Route
        exact
        key={route.path}
        path={route.path}
        element={<ProtectedRoute Component={route.component}
        />}
      />
    ));
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboardfront />} />
        <Route
          path="/register/:lookupkey/:price/:validity"
          element={<Register />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/VerifyCode" element={<VerifyPhoneOtp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/VerifyOTP" element={<OTP />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/ThBotServices" element={<ThBotService />} />
        <Route path="/ThnCoin" element={<Th_coin />} />

        <Route path="/review" element={<Reviews />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog-overview" element={<BlogOverview />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan" element={<Plans />} />
        <Route path="/connect-us" element={<ConnectUs />} />
        {/* <Route path="/PricingPlans" element={<PricingPlans />} /> */}
        <Route path="/posts/oct11" element={<Oct11 />} />
        <Route path="/posts/oct12" element={<Oct12 />} />
        <Route path="/posts/oct13" element={<Oct13 />} />
        <Route path="/posts/oct15" element={<Oct15 />} />
        <Route path="/posts/oct15e" element={<Oct15e />} />
        <Route path="/posts/oct16" element={<Oct16 />} />
        <Route path="/posts/oct17" element={<Oct17 />} />
        <Route path="/posts/oct18" element={<Oct18 />} />
        <Route path="/posts/nov5" element={<Nov5 />} />
        <Route path="/traderhub" element={<TradersHub />} />
        <Route path="/search/:stockName" element={<StockSearches />} />

        <Route path="/signup-verification" element={<OtpVerification />} />

        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />


        {generateProtectedRoutes()}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
