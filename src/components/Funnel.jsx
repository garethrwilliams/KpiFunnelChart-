import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';
import Plot from 'react-plotly.js';

export default function Funnel() {
  const {
    displayData,
    displayDataCompare,
    dataQuery,
    month,
    compare,
    setMonth,
    setCompare,
    setDataQuery,
  } = useContext(StaffContext);

  function handleCompare(e) {
    e.preventDefault();

    setDataQuery((queryObj) => {
      const newQueryObj = { ...queryObj };
      newQueryObj.comparison = 'Company';
      return newQueryObj;
    });

    setCompare(!compare);
  }

  function handleDateChange(e) {
    function changeDateForward(dateStr) {
      const dateArr = dateStr.split('-').map((e) => parseInt(e));
      if (dateArr[1] === 12) {
        dateArr[1] = 1;
        dateArr[0]++;
      } else {
        dateArr[1]++;
      }

      return dateArr
        .map((e) => {
          let toString = e.toString();
          if (toString.length === 1) {
            toString = '0' + toString;
          }
          return toString;
        })
        .join('-');
    }

    function changeDateBackward(dateStr) {
      const dateArr = dateStr.split('-').map((e) => parseInt(e));
      if (dateArr[1] === 1) {
        dateArr[1] = 12;
        dateArr[0]--;
      } else {
        dateArr[1]--;
      }

      return dateArr
        .map((e) => {
          let toString = e.toString();
          if (toString.length === 1) {
            toString = '0' + toString;
          }
          return toString;
        })
        .join('-');
    }

    if (e.target.value) {
      setMonth((monthObj) => {
        const newMonthObj = { ...monthObj };
        newMonthObj[compare ? 'comparison' : 'main'] = e.target.value;
        return newMonthObj;
      });
    }

    if (e.target.textContent === 'Next') {
      setMonth((monthObj) => {
        const newMonthObj = { ...monthObj };
        newMonthObj[compare ? 'comparison' : 'main'] = changeDateForward(
          compare ? month.comparison : month.main
        );
        return newMonthObj;
      });
    }

    if (e.target.textContent === 'Previous') {
      setMonth((monthObj) => {
        const newMonthObj = { ...monthObj };
        newMonthObj[compare ? 'comparison' : 'main'] = changeDateBackward(
          compare ? month.comparison : month.main
        );
        return newMonthObj;
      });
    }
  }

  return (
    <div className=' w-3/4 items-center px-6 py-12 '>
      <div className='border border-blue-600 text-center text-2xl  pl-36 md:pl-16'>
        <div className='flex'>
          <h1>Main: </h1>
          <span className=' text-[#d7381e] pl-4 '>{dataQuery.main}</span>
        </div>
        <div className='flex'>
          <h1>Comparison: </h1>
          {compare ? (
            <span className='text-[#1ebdd7] pl-4'>{dataQuery.comparison}</span>
          ) : (
            <span className='text-[#C5C6D0] pl-4'>Target</span>
          )}
        </div>
      </div>
      {displayData === 'out of range' ? (
        <h1 className='text-center'>No data available for selected month</h1>
      ) : (
        <div className='relative border border-black'>
          <div className='absolute left-0 right-0 ml-auto mr-auto w-[600px] '>
            <Plot
              data={[
                {
                  x: displayData.x,
                  y: displayData.y,
                  showlegend: false,
                  type: 'funnel',
                  textposition: 'auto',
                  textinfo: 'value+percent initial',
                  opacity: 1,
                  marker: {
                    color: ['d7381e', 'c1321b', 'd7381e', 'e2462d', 'e55a43'],
                  },
                  line: {
                    width: [4, 2, 2, 3, 1, 1],
                    color: ['3E4E88', '606470', '3E4E88', '606470', '606470'],
                  },
                  connector: {
                    line: { color: 'gray', width: 1 },
                  },
                },
              ]}
              layout={{
                margin: { l: 150, t: 30, b: 10, r: 80 },
                width: 600,
                height: 400,
                title: {
                  pad: { l: -15 },
                  xanchor: 'left',
                  funnelmode: 'stack',
                },
              }}
              config={{ displayModeBar: false }}
            />
          </div>

          {compare ? (
            <div className='opacity-50 absolute left-0 right-0 ml-auto mr-auto w-[600px] z-1 pointer-events-none'>
              <Plot
                data={[
                  {
                    x: displayDataCompare.x,
                    y: displayDataCompare.y,
                    showlegend: false,
                    type: 'funnel',
                    textposition: 'none',
                    hoverinfo: 'value+percent initial',
                    opacity: 1,
                    marker: {
                      color: ['1ebdd7', '1ebdd7', '1ebdd7', '1ebdd7', '1ebdd7'],
                    },
                    line: {
                      width: [4, 2, 2, 3, 1, 1],
                      color: ['3E4E88', '606470', '3E4E88', '606470', '3E4E88'],
                    },
                    connector: {
                      line: { color: ' gray', width: 1 },
                    },
                    name: '',
                  },
                ]}
                layout={{
                  margin: { l: 150, t: 30, b: 10, r: 80 },
                  pad: { r: 200 },
                  width: 600,
                  height: 400,
                  xaxis: { fixedrange: true },
                  yaxis: { fixedrange: true },
                }}
                config={{ displayModeBar: false }}
              />
            </div>
          ) : (
            <div className='opacity-50 absolute left-0 right-0 ml-auto mr-auto w-[600px] z-1 pointer-events-none'>
              <Plot
                data={[
                  {
                    x: [100, 70, 50, 30, 10],
                    y: displayData.y,
                    showlegend: false,
                    type: 'funnel',
                    textposition: 'none',
                    hoverinfo: 'none',
                    hovertemplate: 'Target %{x}%',
                    opacity: 0.5,
                    marker: {
                      color: ['C5C6D0', 'C5C6D0', 'C5C6D0', 'C5C6D0', 'C5C6D0'],
                    },
                    line: {
                      width: [4, 2, 2, 3, 1, 1],
                      color: ['C5C6D0', 'C5C6D0', 'C5C6D0', 'C5C6D0', 'C5C6D0'],
                    },
                    connector: {
                      line: { color: ' gray', width: 1 },
                    },
                    name: '',
                  },
                ]}
                layout={{
                  margin: { l: 150, t: 30, b: 10, r: 80 },
                  width: 600,
                  height: 400,
                  xaxis: { fixedrange: true },
                  yaxis: { fixedrange: true },
                }}
                config={{ displayModeBar: false }}
              />
            </div>
          )}
          <div className='absolute left-0 right-0 ml-auto mr-auto w-[600px]'>
            <div className=' bg-[#f59385] h-[10px] w-[10px] right-[60px] top-[38px] absolute'></div>
            <p className='-right-[15px] top-[30px] absolute'>{month.main}</p>
            <div className=' bg-[#85bff5] h-[10px] w-[10px] right-[60px] top-[68px] absolute'></div>
            <p className='-right-[15px] top-[60px] absolute'>
              {month.comparison}
            </p>
          </div>
          <div className=' h-[406px]'></div>
        </div>
      )}
      <div className='my-16 text-center border border-fuchsia-600 pl-28 '>
        <button onClick={handleDateChange}>Previous</button>
        <input
          type='month'
          min='2018-01'
          value={compare ? month.comparison : month.main}
          onChange={handleDateChange}
          max={new Date().toISOString().split('-').slice(0, 2).join('-')}
          className='mx-4'
        />
        <button
          onClick={handleDateChange}
          disabled={
            compare
              ? month.comparison ===
                new Date().toISOString().split('-').slice(0, 2).join('-')
              : month.main ===
                new Date().toISOString().split('-').slice(0, 2).join('-')
          }
        >
          Next
        </button>
      </div>
      <div
        className={`my-16 text-center border pl-24 border-teal-400 ${
          compare ? 'bg-slate-500' : ''
        }`}
      >
        <button onClick={handleCompare}>Compare</button>
      </div>
    </div>
  );
}
