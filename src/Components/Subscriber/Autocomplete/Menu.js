import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

export default Menu;
