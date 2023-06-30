import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchedHistoricalData = async () => {
      const formattedDate = selectedDate.toString().split('T')[0];
      const data = await (
        await fetch(
          'https://api.freecurrencyapi.com/v1/historical?apikey=CXzykYmtN94nK6QnKbPkoKFo642PswLTpgafsLeW&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=EUR&date_from=2023-06-01T12%3A31%3A57.022Z&date_to=2023-06-01T12%3A31%3A57.023Z'
        )
      ).json();
      setHistoricalData(data);
    };
    fetchedHistoricalData();
  }, [selectedDate]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Valiutos kurso data:</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      {historicalData && (
        <div>
          <h3>Historical Data for {selectedDate.toDateString()}</h3>
          {/* Display historical data here */}
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
