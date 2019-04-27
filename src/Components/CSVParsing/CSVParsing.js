import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { parse } from "papaparse";
import MUIDataTable from "mui-datatables";
import { Row, Col } from "reactstrap";
import { styles } from "../commonStyles/ModuleItemListStyles";
import { withStyles } from "@material-ui/core";

const dropzoneStyle = {
  width: 250,
  height: 150,
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
  margin: "0 auto"
};

class CSVParsing extends Component {
  state = {
    files: [],
    data: []
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

    // console.log("PARSED DATE IS ", data);

    const columns = data.length !== 0 ? data.map(i => Object.keys(i))[0] : null;

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    return (
      <React.Fragment>
        <div style={{ marginTop: "100px" }} className={classes.root}>
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
            <MUIDataTable
              title={"MSFT Stock"}
              data={dataForTableRendering}
              columns={columns}
              options={options}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CSVParsing);
