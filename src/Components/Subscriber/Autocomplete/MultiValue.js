import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import CancelIcon from "@material-ui/icons/Cancel";

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

export default MultiValue;
