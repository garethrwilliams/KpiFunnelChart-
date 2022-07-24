import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';
import Plot from 'react-plotly.js';

export default function Funnel() {
  const { displayData, dataQuery, month, setMonth } = useContext(StaffContext);

  return (
    <div className=' w-3/4 items-center px-6 py-12 '>
      <div className='border border-blue-600 text-center text-2xl  pl-36 md:pl-16'>
        <h1>{dataQuery}</h1>
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
                  textposition: 'inside',
                  textinfo: 'value+percent initial',
                  hoverinfo: 'percent total+x',
                  opacity: 1,
                  marker: {
                    color: ['59D4E8', 'DDB6C6', 'A696C8', '67EACA', '94D2E6'],
                  },
                  line: {
                    width: [4, 2, 2, 3, 1, 1],
                    color: ['3E4E88', '606470', '3E4E88', '606470', '3E4E88'],
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
              o

              // annotations={[
              //   {
              //     x: 100,
              //     y: displayData.y[0],
              //     xref: 'x',
              //     yref: 'y',
              //     text: 'Annotation A',
              //     showarrow: true,
              //     arrowhead: 3,
              //     ax: -30,
              //     ay: -40,
              //   },
              // ]}
            />
          </div>
          <div className=' h-[406px] w-[600px]'></div>
        </div>
      )}
      <div className='my-16 text-center border border-fuchsia-600 '>
        <label>Month: </label>
        <input
          type='month'
          min='2018-01'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          max={new Date().toISOString().split('-').slice(0, 2).join('-')}
        />
      </div>
    </div>
  );
}
