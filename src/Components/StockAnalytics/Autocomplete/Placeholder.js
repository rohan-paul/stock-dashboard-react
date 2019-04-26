import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

export default Placeholder;
