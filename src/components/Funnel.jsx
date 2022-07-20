import Plot from 'react-plotly.js';
import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';
import { useEffect } from 'react';

export default function Funnel() {
  const { displayData, dataQuery, month, setMonth } = useContext(StaffContext);
  let data = [];
  console.log('displayData:', displayData);

  useEffect(() => {
    if (displayData) {
      data.push({
        x: displayData.x,
        y: displayData.y,
        type: 'funnel',
        hoverinfo: 'x+percent previous+percent initial',
      });
    }
  }, [displayData, data]);

  return (
    <div className=' w-3/4 items-center px-6 py-12 text-center'>
      <h1 className='py-6 text-2xl'>{dataQuery}</h1>
      {displayData === 'out of range' ? (
        <h1>No data available for selected month</h1>
      ) : (
        <Plot
          data={data}
          layout={{ margin: { l: 150 }, width: 600, height: 700 }}
        />
      )}
      <div className='my-16 items-start'>
        <label>Month: </label>

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
