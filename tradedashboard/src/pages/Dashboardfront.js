import React from "react";
import Content from "../components/dashboard-component/Content";
import NavTop from "../components/nav/NavTop";
import { Helmet } from "react-helmet-async";

const Dashboardfront = () => {
  return (
    <>
      <Helmet>
        <title>
          {" "}
          Traders Hub | Your Ultimate Destination for Financial Insights, Market
          News & Investing Wisdom
        </title>
        <meta
          name="description"
          content="Discover a world of financial expertise at Traders Hub, your premier source for market news,
 investment education, and retirement strategies. Gain valuable insights from seasoned advisors and elevate your financial knowledge.
  Explore the hub of smart investing today."
        />
      </Helmet>
 
      <NavTop />
     
      <Content />
      
    </>
  );
};

export default Dashboardfront;
