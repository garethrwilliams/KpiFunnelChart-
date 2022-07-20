import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { getMonthData } from '../utils/api';
import { capitaliseFirstLetter } from '../utils/helperFucntion';

export const StaffContext = createContext();

export const StaffProvider = (props) => {
  const [staff, setStaff] = useState({});
  const [month, setMonth] = useState('2022-07');
  const [dataQuery, setDataQuery] = useState('Company');
  const [displayData, setDisplayData] = useState();
  const [kpiData, setKpiData] = useState('');

  useEffect(() => {
    getMonthData(month + '-01')
      .then((data) => {
        setKpiData(data);

        if (!data.success) {
          return setDisplayData('out of range');
        }
        const staffList = {};

        data.kpi.forEach((staffMember) => {
          if (!staffList[staffMember.team]) {
            staffList[staffMember.team] = [];
          }

          staffList[staffMember.team].push(
            capitaliseFirstLetter(staffMember.assigned)
          );
        });

        getDisplayData(dataQuery, data, staffList);
        setStaff(staffList);
      })
      .then(() => {});
  }, [dataQuery, month]);

  function getDisplayData(dataQuery, data, staffList) {
    const displayData = {
      enquiries: 0,
      qualifications: 0,
      quotes: 0,
      proposals: 0,
      orders: 0,
    };

    data.kpi.forEach((item) => {
      if (dataQuery === 'Company') {
        // Add enquires
        displayData.enquiries += parseInt(item.penquiry);
        displayData.enquiries += parseInt(item.wenquiry);
        displayData.enquiries += parseInt(item.oenquiry);

        // Qualifications
        displayData.qualifications += parseInt(item.qualifications);

        // Quotes
        displayData.quotes += parseInt(item.quotes);

        // Proposals
        displayData.proposals += parseInt(item.proposals);

        // Orders
        displayData.orders += parseInt(item.enqorders);
      }

      if (item.team === dataQuery) {
        // Add enquires
        displayData.enquiries += parseInt(item.penquiry);
        displayData.enquiries += parseInt(item.wenquiry);
        displayData.enquiries += parseInt(item.oenquiry);

        // Qualifications
        displayData.qualifications += parseInt(item.qualifications);

        // Quotes
        displayData.quotes += parseInt(item.quotes);

        // Proposals
        displayData.proposals += parseInt(item.proposals);

        // Orders
        displayData.orders += parseInt(item.enqorders);
      }

      if (capitaliseFirstLetter(item.assigned) === dataQuery) {
        // Add enquires
        displayData.enquiries += parseInt(item.penquiry);
        displayData.enquiries += parseInt(item.wenquiry);
        displayData.enquiries += parseInt(item.oenquiry);

        // Qualifications
        displayData.qualifications += parseInt(item.qualifications);

        // Quotes
        displayData.quotes += parseInt(item.quotes);

        // Proposals
        displayData.proposals += parseInt(item.proposals);

        // Orders
        displayData.orders += parseInt(item.enqorders);
      }
    });

    // Order data for funnel-pipeline
    const orderedDisplayData = { x: [], y: [] };

    for (let key in displayData) {
      if (key === 'enquiries') {
        orderedDisplayData.y.push(`${key} 100%`);
        orderedDisplayData.x.push(displayData[key]);
      }

      if (key === 'qualifications') {
        const percentDiff =
          (displayData.qualifications / displayData.enquiries) * 100;
        orderedDisplayData.y.push(`${key} ${percentDiff.toFixed(2)}%`);
        orderedDisplayData.x.push(displayData[key]);
      }
      if (key === 'quotes') {
        const percentDiff = (displayData.quotes / displayData.enquiries) * 100;
        orderedDisplayData.y.push(`${key} ${percentDiff.toFixed(2)}%`);
        orderedDisplayData.x.push(displayData[key]);
      }
      if (key === 'proposals') {
        const percentDiff =
          (displayData.proposals / displayData.enquiries) * 100;
        orderedDisplayData.y.push(`${key} ${percentDiff.toFixed(2)}%`);
        orderedDisplayData.x.push(displayData[key]);
      }
      if (key === 'orders') {
        const percentDiff = (displayData.orders / displayData.enquiries) * 100;
        orderedDisplayData.push(`${key} ${percentDiff.toFixed(2)}%`);
        orderedDisplayData.push(displayData[key]);
      }
    }

    console.log('orderedDisplayData:', orderedDisplayData);

    setDisplayData(orderedDisplayData);
  }

  return (
    <StaffContext.Provider
      value={{
        staff,
        kpiData,
        displayData,
        dataQuery,
        month,
        setMonth,
        setDataQuery,
      }}
    >
      {props.children}
    </StaffContext.Provider>
  );
};
