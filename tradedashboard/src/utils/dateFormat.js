export const formatDateToYearMonthDate = (date) => {
  if (!date) return ""
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const groupByDateWithLimit = (data, limitPerDate,start,end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArr = []
  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      dateArr.push(currentDate.toISOString().slice(0, 10));
  }
  const groupedData = data.reduce((acc, item ) => {
    // const hasTime = item.date.includes(" ");
    // const date = hasTime ? item.date.split(" ")[0] : item.date;
    dateArr.forEach((date) =>{
      if (!acc[date]) {
            console.log(acc[date],'ok')
            acc[date] = [];
          }
      if (acc[date].length < limitPerDate && date === item.date){
        acc[date].push(item);
      } 
    })
    return acc;
  }, {});
  const sortedDates = Object.keys(groupedData).sort();

  const groupedArray = sortedDates.map((date) => {
    return { date, items: groupedData[date] };
  });
  return groupedArray;
};