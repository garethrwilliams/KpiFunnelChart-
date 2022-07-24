import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { getMonthData } from '../utils/api';
import { capitaliseFirstLetter } from '../utils/helperFucntion';

export const StaffContext = createContext();

export const StaffProvider = (props) => {
  const [staff, setStaff] = useState({});
  const [month, setMonth] = useState(
    new Date().toISOString().split('-').slice(0, 2).join('-')
  );
  const [dataQuery, setDataQuery] = useState('Company');
  const [displayData, setDisplayData] = useState({ x: [], y: [] });
  const [kpiData, setKpiData] = useState({});
  console.log('displayData:', displayData);

  useEffect(() => {
    // If the month hasn't been loaded then call API

    if (!kpiData[month]) {
      getMonthData(month + '-01').then((data) => {
        // Add months data to data object

        setKpiData((KpiObj) => {
          const newKpiObj = { ...KpiObj };
          newKpiObj[month] = data;
          return newKpiObj;
        });

        updateDisplayData(data);
      });
    } else {
      // Else load from data object
      updateDisplayData(kpiData[month]);
    }
  }, [dataQuery, month]);

  function getDisplayData(dataQuery, data) {
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
      orderedDisplayData.y.push(key);
      orderedDisplayData.x.push(displayData[key]);
    }

    setDisplayData(orderedDisplayData);
  }

  function updateDisplayData(data) {
    const staffList = {};

    data.kpi.forEach((staffMember) => {
      // Change '' to 'Unassigned' so that the data is correctly retrieved
      if (staffMember.team === '') {
        staffMember.team = 'Unassigned';
      }

      if (!staffList[staffMember.team]) {
        staffList[staffMember.team] = [];
      }

      staffList[staffMember.team].push(
        capitaliseFirstLetter(staffMember.assigned)
      );
    });

    getDisplayData(dataQuery, data);
    setStaff(staffList);
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
