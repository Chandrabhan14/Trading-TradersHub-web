import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const extractHoursAndMinutes = (time) => {
  const timeRegex = /^(\d{2}):(\d{2})/;
  const timeArray = time.match(timeRegex);
  if (!timeArray) return null;

  const [fullMatch, hours, minutes] = timeArray;

  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  };
};

const StockMarketButton = ({ marketHours, holidays }) => {
  const openingTime = extractHoursAndMinutes(marketHours.openingHour);
  const closingTime = extractHoursAndMinutes(marketHours.closingHour);

  const isMarketOpen = () => {
    if (!openingTime || !closingTime) return false;

    const now = moment().tz("America/New_York");
    const currentYearHoliday = holidays.stockMarketHolidays.find(
      (holiday) => holiday.year === now.get("year")
    );

    if (currentYearHoliday) {
      const isHolidayToday = Object.values(currentYearHoliday).includes(
        now.format("YYYY-MM-DD")
      );
      if (isHolidayToday) return false;
    }

    const opening = now.clone().set({
      hours: openingTime.hours,
      minutes: openingTime.minutes,
      seconds: 0,
      milliseconds: 0,
    });

    const closing = now.clone().set({
      hours: closingTime.hours,
      minutes: closingTime.minutes,
      seconds: 0,
      milliseconds: 0,
    });

    return now.isBetween(opening, closing);
  };

  const currentTimeFormatted = () =>
    moment().tz("America/New_York").format("MMMM DD, YYYY - HH:mm:ss zz");

  const [currentTime, setCurrentTime] = useState(currentTimeFormatted());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(currentTimeFormatted());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const buttonLabel = holidays?.isTheStockMarketOpen
    ? "Market Open"
    : "Market Close";

  return (
    <div className="market_closing_section">
      <i className="fa-solid fa-satellite-dish"></i>
      <div className="market_closing_content">
        <strong>{buttonLabel}</strong>
        <p>{currentTime}</p>
      </div>
    </div>
  );
};

export default StockMarketButton;
