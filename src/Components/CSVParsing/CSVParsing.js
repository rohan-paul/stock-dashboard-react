import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { parse } from "papaparse";
import MUIDataTable from "mui-datatables";
import { Row, Col } from "reactstrap";
import { styles } from "../commonStyles/ModuleItemListStyles";
import { withStyles } from "@material-ui/core";
import CSVParsingChart from "./CSVParsingChart";
const omit = require("lodash.omit");
const flatten = require("lodash.flatten");

// Function to return the data as an array of arrays for rendering the ReactHighstock data. But if I am not rendering the stock data (instead only a horizontal line chart then use the next two functions instead formattedDataForXAxisForHighChart() and formattedDataForYAxisForHighChart()  )
const formattedDataForHighChartsStocks = data => {
  return data.map(obj => {
    let omittedObject = omit(obj, [
      "Open",
      "High",
      "Low",
      "Adj Close",
      "Volume"
    ]);
    return Object.values(omittedObject);
  });
};

// Two Functions to return the data as an array XAxis values and YAxis values for rendering the ReactHighChart data. But if I am rendering the stock data - then use the above function instead formattedDataForHighChartsStocks ()
const formattedDataForXAxisForHighChart = data => {
  let result = [];
  data.map((obj, index) => {
    let omittedObject = omit(obj, [
      "Open",
      "High",
      "Low",
      "Close",
      "Adj Close",
      "Volume"
    ]);
    return (result[index] = Object.values(omittedObject));
  });
  return flatten(result);
};

const formattedDataForYAxisForHighChart = data => {
  let result = [];
  data.map((obj, index) => {
    let omittedObject = omit(obj, [
      "Date",
      "Open",
      "High",
      "Low",
      "Adj Close",
      "Volume"
    ]);
    return (result[index] = Object.values(omittedObject));
  });
  return flatten(result);
};

// const resultData = _.flatten(formattedDataForHighChartsLodash(data));

const dropzoneStyle = {
  width: 250,
  height: 90,
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
  margin: "0 auto"
};

class CSVParsing extends Component {
  state = {
    files: [],
    data: [],
    tableState: {},
    rowsPerPage: 10
  };

  onChangeRowsPerPage = rowsPerPage => {
    this.setState({ rowsPerPage });
  };

  // Function to use the browser's FileReader api to capture the uploaded file
  onDrop = files => {
    const file = files[0];
    if (file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result;
        const {
          data,
          meta: { fields }
        } = parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        this.setState({
          data: data
        });
      };
      reader.onabort = () => alert("File reading was aborted.");
      reader.onerror = () => alert("File reading has failed.");
      reader.readAsBinaryString(file);
    }
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    const dataForTableRendering =
      data.length !== 0 ? data.map(i => Object.values(i)) : null;

    const formattedDataForChartStoks = formattedDataForHighChartsStocks(data);

    const formattedXAxisDataForChartLine = formattedDataForXAxisForHighChart(
      data
    );
    const formattedYAxisDataForChartLine = formattedDataForYAxisForHighChart(
      data
    );

    // console.log("PARSED DATA IS ", formattedDataForChart);

    const columns = data.length !== 0 ? data.map(i => Object.keys(i))[0] : null;

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: true,
      rowsPerPage: this.state.tableState
        ? this.state.tableState.rowsPerPage
        : 10,
      onChangeRowsPerPage: this.onChangeRowsPerPage,
      activeColumn: this.state.tableState
        ? this.state.tableState.activeColumn
        : 0,
      onTableChange: (action, tableState) => {
        // console.log("taBLE STATE IS ", JSON.stringify(tableState));
        this.setState({
          tableState: tableState
        });
      }
    };

    return (
      <React.Fragment>
        <div style={{ marginTop: "50px" }} className={classes.root}>
          <section style={dropzoneStyle}>
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </section>
          {data.length !== 0 ? (
            <div>
              <MUIDataTable
                title={"MSFT Stock"}
                data={dataForTableRendering}
                columns={columns}
                options={options}
              />
              <CSVParsingChart
                formattedDataForChartStoks={formattedDataForChartStoks}
                formattedXAxisDataForChartLine={formattedXAxisDataForChartLine}
                formattedYAxisDataForChartLine={formattedYAxisDataForChartLine}
              />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CSVParsing);

/*
{console.log("FORMATTED DATA IS ", dataForTableRendering)}
*/

/* 1> Explanation of why I need to the function formattedDataForHighChartsStocks()

I get the data as below

const data = [
	{
		Date: "2019-03-26",
		Open: 118.620003,
		High: 118.709999,
		Low: 116.849998,
		Close: 117.910004
	},
	{
		Date: "2019-03-27",
		Open: 117.879997,
		High: 118.209999,
		Low: 115.519997,
		Close: 116.769997
	}
];

But for HighChartsStocks  - i.e. when I am using the below way of importing

const ReactHighstock = require("react-highcharts/ReactHighstock.src")

I need the data as below

formattedData = [ [ '2019-03-26', 117.910004 ], [ '2019-03-27', 116.769997 ] ]


2>

 */
