import React, { useEffect, useState } from 'react';
import { fetchRevenueProjection } from '../../Features/RevenueProjection/api/getRevenueProjection';
import { AxiosError } from 'axios';
import DashBoardRevenue from './DashBoardRevenue';

const DashBoardQuaterlyRevenueHandler = () => {
  const [revenueData, setRevenueData] = useState<{ [key: string]: number } | undefined>();
  const [error, setError] = useState<any>();
  const [currentQuarterRevenue, setCurrentQuarterRevenue] = useState<number>(0);
  const [previousQuarterRevenue, setPreviousQuarterRevenue] = useState<number>(0);
  const responsetype='Quarter';
  useEffect(() => {
    fetchQuarterlyRevenue();
  }, []);

  const fetchQuarterlyRevenue = async () => {
    const requestBody = {
      type: 'quarterly',
    };
   
    try {
      const { data }: { data: { [key: string]: number } } = await fetchRevenueProjection(undefined, requestBody);
      
      if (data instanceof AxiosError) {
        console.log(data.response?.data);
        setError(data.response?.data);
      } else {
        const currentQuarter = getCurrentQuarter();
        const currentQuarterRevenue = data[currentQuarter] || 0;
        setCurrentQuarterRevenue(currentQuarterRevenue);

        const previousQuarter = getPreviousQuarter(currentQuarter);
        const previousQuarterRevenue = data[previousQuarter] || 0;
        setPreviousQuarterRevenue(previousQuarterRevenue);

        setRevenueData(data);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
      setError(error);
    }
  };

  // Helper function to get the current quarter (e.g., "2022-Q2")
  const getCurrentQuarter = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const quarter = Math.ceil(currentMonth / 3);
    return `${currentYear}-Q${quarter}`;
  };

  // Helper function to get the previous quarter based on the current quarter
  const getPreviousQuarter = (currentQuarter: string) => {
    const [year, quarterStr] = currentQuarter.split('-');
    const quarter = parseInt(quarterStr);
    const previousQuarter = quarter === 1 ? 4 : quarter - 1;
    const previousYear = quarter === 1 ? parseInt(year) - 1 : parseInt(year);
    return `${previousYear}-Q${previousQuarter}`;
  };

  return (
    <DashBoardRevenue currentMonthRevenue={currentQuarterRevenue} previousMonthRevenue={previousQuarterRevenue} responsetype={responsetype} />
  );
};

export default DashBoardQuaterlyRevenueHandler;
