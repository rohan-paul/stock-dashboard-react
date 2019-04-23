import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

export default SingleValue;
