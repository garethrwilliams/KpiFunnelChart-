import { FunnelChart } from 'react-funnel-pipeline';
import 'react-funnel-pipeline/dist/index.css';
import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';
import { useState } from 'react';

export default function Funnel() {
  const { displayData, dataQuery, month, setMonth } = useContext(StaffContext);

  return (
    <div className=' w-3/4 items-center px-6 py-12 text-center'>
      <h1 className='py-6 text-2xl'>{dataQuery}</h1>
      {displayData === 'out of range' ? (
        <h1>No data available for selected month</h1>
      ) : (
        <FunnelChart
          data={displayData}
          // heightRelativeToValue={true}
          chartHeight={400}
        />
      )}
      <div className='my-16 items-start'>
        <label for='start'>Month: </label>

        <input
          type='month'
          min='2018-01'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
    </div>
  );
}
