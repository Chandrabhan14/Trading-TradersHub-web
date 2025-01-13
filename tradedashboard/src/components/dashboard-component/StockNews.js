import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getStockNewsa } from "../../services/UserServices";
const StockNews = () => {
  const [stockNews, setStockNews] = useState([]);
  useEffect(() => {
    const getStockNews = async () => {
      try {
        const result = await getStockNewsa();
       
        setStockNews(result);
      } catch (error) {
        setStockNews([]);
        console.log(error);
      }
    };
    getStockNews();
  }, []);

  const onTileClick = (item) => {
    console.log(item);
    window.open(item.url, "_blank");
  };

  return (
    <div>
      <div className="">
        <h2>Social Sentiment</h2>
        <div
          className="table-responsive custom-table"
          style={{
            color: "white",
            backgroundColor: "#020134;",
          }}
        >
          <table className="table" style={{ backgroundColor: "#020134" }}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Posts</th>
                <th>Likes</th>
                <th>Impressions</th>
              </tr>
            </thead>
            <tbody>
              {stockNews?.slice(0, 5).map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={onTileClick.bind(this, item)}
                >
                  <td style={{}}>
                    {item.symbol}
                  </td>
                  <td style={{}}>
                    {item.stocktwitsPosts}
                  </td>
                  <td style={{}}>
                    {item.stocktwitsLikes}
                  </td>
                  <td style={{}}>
                    {item.stocktwitsImpressions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockNews;
