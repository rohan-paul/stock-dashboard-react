import React from "react";
import { AreaClosed, Line, Bar } from "@vx/shape";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import axios from "axios";

// util
const formatDate = timeFormat("%b %d, '%y");
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

const getDateAndClosingPrice = obj => {
  let result = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key].close]);
    }
  }
  return result.map(i => ({
    date: i[0],
    close: i[1]
  }));
};

class SandP500_PE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s_and_p_500_index: []
    };
    this.handleTooltip = this.handleTooltip.bind(this);
  }

  // VERY IMPORTANT - THE BELOW 'WORLDTRADINGDATA' WILL ONLY GIVE ME 250 FREE API CALLS PER DAY, AND IN THE BELOW GRAPH WHEN I MOVE MY MOUSE OVER, IT TRIGGERS THE API CALL WITH EACH MOVE OF MOUSE OVER THE DATE.
  // AND I THINK handleToolTip() functions is the reason behind this.
  componentDidMount() {
    const { fromDate, toDate } = this.props;
    const APIkey = process.env.REACT_APP_WORLD_TRADING_DATA_API_TOKEN;

    const url = `https://www.worldtradingdata.com/api/v1/history?symbol=^INX&date_from=${fromDate}&date_to=${toDate}&sort=newest&api_token=${APIkey}`;

    if (fromDate !== "" && toDate !== "") {
      axios
        .get(url)
        .then(res => {
          if (
            res.data &&
            res.data.history &&
            Object.entries(res.data.history).length !== 0
          ) {
            const formattedDataFromAPI_response = getDateAndClosingPrice(
              res.data.history
            );
            this.setState({
              s_and_p_500_index: formattedDataFromAPI_response.reverse()
            });
          }
        })
        .catch(err => console.log("Error while fetching data ", err));
    }
  }

  handleTooltip({ event, data, xStock, xScale, yScale }) {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close)
    });
  }
  render() {
    const width = 500;
    const height = 200;
    const margin = {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2
    };

    const {
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events
    } = this.props;
    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(this.state.s_and_p_500_index, xStock)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(this.state.s_and_p_500_index, yStock) + yMax / 3],
      nice: true
    });

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          {console.log("STOCK IS", this.state.s_and_p_500_index)}
          {console.log("FROM DATE", this.props.fromDate)}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#32deaa"
            rx={14}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <GridRows
            lineStyle={{ pointerEvents: "none" }}
            scale={yScale}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <GridColumns
            lineStyle={{ pointerEvents: "none" }}
            scale={xScale}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <AreaClosed
            data={this.state.s_and_p_500_index}
            x={d => xScale(xStock(d))}
            y={d => yScale(yStock(d))}
            yScale={yScale}
            strokeWidth={1}
            stroke={"url(#gradient)"}
            fill={"url(#gradient)"}
            curve={curveMonotoneX}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            data={this.state.s_and_p_500_index}
            onTouchStart={event =>
              this.handleTooltip({
                event,
                xStock,
                xScale,
                yScale,
                data: this.state.s_and_p_500_index
              })
            }
            onTouchMove={event =>
              this.handleTooltip({
                event,
                xStock,
                xScale,
                yScale,
                data: this.state.s_and_p_500_index
              })
            }
            onMouseMove={event =>
              this.handleTooltip({
                event,
                xStock,
                xScale,
                yScale,
                data: this.state.s_and_p_500_index
              })
            }
            onMouseLeave={event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="rgba(92, 119, 235, 1.000)"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: "rgba(92, 119, 235, 1.000)",
                color: "white"
              }}
            >
              {`$${yStock(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: "translateX(-50%)"
              }}
            >
              {formatDate(xStock(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}

export default withTooltip(SandP500_PE);

/* Explanation of the getDateAndClosingPrice function above after getting the response from the API data ********

Original data received from API

const data = {
	"2019-03-29": {
		open: "2828.27",
		close: "2834.40",
		high: "2836.03",
		low: "2819.23",
		volume: "0"
	},
	"2019-03-28": {
		open: "2809.40",
		close: "2815.44",
		high: "2819.71",
		low: "2798.77",
		volume: "0"
	}
};

BUT I need data in following format

[ { date: '2019-03-29', close: '2834.40' },
  { date: '2019-03-28', close: '2815.44' } ]


 */
