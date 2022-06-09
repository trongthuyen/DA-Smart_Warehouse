import Icon from './Icon';
import { ResponsiveContainer } from 'recharts';
import { CartesianGrid } from 'recharts';
import { LineChart } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { Tooltip } from 'recharts';
import { Legend } from 'recharts';
import { Line } from 'recharts';
import { useState } from 'react';


export default function Graph({name, graphData}) {
  console.log(graphData)
  const [toggleState, setToggleState] = useState(4);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl overflow-hidden tooltip-head">
          <div className="flex items-center justify-between p-2">
            <div className="">{name}</div>
            <Icon path="res-react-dash-options" className="w-2 h-2" />
          </div>
          <div className="tooltip-body text-center p-3">
            <div className="text-white font-bold">{`${ label }`}</div>
            {toggleState == 5 ? <div className="hum">Humidity is {`${parseFloat(payload[0].value)?.toFixed(2)}` } %</div> :
            <div className="temp">Temporature is {`${parseFloat(payload[0].value)?.toFixed(2)}` } &deg;C = {`${(parseFloat(payload[0].value) * 9 / 5 + 32)?.toFixed(2)}` } &deg;F</div>}
          </div>
        </div>
      );
    }
  };
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">{toggleState === 4 ? `Temporature (°C)` : `Humidity (%)`}</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2 bloc-tabs flex-grow">
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => setToggleState(4)}
          >
            Temporature
          </button>
          <button
            className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => setToggleState(5)}
          >
            Humidity
          </button>
          </div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div>
        </div>
      </div>
      <div className={"flex-grow content active-content"}>
        {toggleState && 
        <ResponsiveContainer width="100%" height="100%">
          <div>
          <LineChart width={750} height={290} data={graphData}>
            <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend/>
            <Line
                type="category"
                dataKey={toggleState === 4 ? 'temper' : 'humid'}
                stroke={toggleState === 4 ? '#c43240' : '#407ba7'}
                strokeWidth="4"
                dot={false}
              />
          </LineChart>
          </div>
        </ResponsiveContainer>}
      </div>
    </div>
  );
}