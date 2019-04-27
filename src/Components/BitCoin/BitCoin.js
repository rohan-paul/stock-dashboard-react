import React from "react";
import { AreaClosed, Line, Bar } from "@vx/shape";
import { appleStock } from "@vx/mock-data";
import { curveMonotoneX } from "@vx/curve";
import { GridRows, GridColumns } from "@vx/grid";
import { scaleTime, scaleLinear } from "@vx/scale";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { Row, Col } from "reactstrap";
import { styles } from "../commonStyles/ModuleItemListStyles";
import { withStyles } from "@material-ui/core";

// util
const formatDate = timeFormat("%b %d, '%y");
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;
const bisectDate = bisector(d => new Date(d.date)).left;

class BitCoin extends React.Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
  }

  async componentDidMount() {
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/historical/close.json"
    );
    const data = await res.json();

    this.setState({
      data: Object.keys(data.bpi).map(item => {
        return {
          date: item,
          close: data.bpi[item]
        };
      })
    });
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
    const height = 250;
    const margin = {
      top: 60,
      bottom: 20,
      left: 80,
      right: 80
    };

    const {
      classes,
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
      domain: extent(this.state.data, xStock)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(this.state.data, yStock) + yMax / 3],
      nice: true
    });

    return (
      <div style={{ overflowX: "auto" }} className={classes.root}>
        <Row>
          <Col xs="12" className={classes.root}>
            <svg ref={s => (this.svg = s)} width={width} height={height}>
              {console.log("DATA IS", this.state.data)}
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
                data={this.state.data}
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
                data={this.state.data}
                onTouchStart={event =>
                  this.handleTooltip({
                    event,
                    xStock,
                    xScale,
                    yScale,
                    data: this.state.data
                  })
                }
                onTouchMove={event =>
                  this.handleTooltip({
                    event,
                    xStock,
                    xScale,
                    yScale,
                    data: this.state.data
                  })
                }
                onMouseMove={event =>
                  this.handleTooltip({
                    event,
                    xStock,
                    xScale,
                    yScale,
                    data: this.state.data
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
          </Col>
        </Row>
      </div>
    );
  }
}

// export default withTooltip(BitCoin);
export default withStyles(styles)(withTooltip(BitCoin));

/* Understanding the setState mechanism - Basically I have to convert and plain object to an array of objects with 2 fields added ('date' and 'close')

A> From Coindesk API - I will get the below data

const data = {
	bpi: {
		"2019-03-26": 3945.325,
		"2019-03-27": 4051.9033,
		"2019-03-28": 4039.0017,
		"2019-03-29": 4119.0183,
		"2019-03-30": 4117.8483
	},
	disclaimer:
		"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
	time: {
		updated: "Apr 26, 2019 00:03:00 UTC",
		updatedISO: "2019-04-26T00:03:00+00:00"
	}
};

B> But I need the data (i.e. my state) in the below format

[ { date: '2019-03-26', close: 3945.325 },
  { date: '2019-03-27', close: 4051.9033 },
  { date: '2019-03-28', close: 4039.0017 },
  { date: '2019-03-29', close: 4119.0183 },
  { date: '2019-03-30', close: 4117.8483 } ]

C> Hence, first I get all the dates from the API-data with Object.keys() which will return me all the keys of the original received objects as an array

this.setState({
      data: Object.keys(data.bpi).map(item => {
        return {
          date: item,
          close: data.bpi[item]
        };
      })
    });
*/
