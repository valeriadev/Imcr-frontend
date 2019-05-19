import React, { Component } from "react";
import { set, getByKey } from "./mitraClipRecord";

export default class IMCRListOptions extends Component {
  render() {
    let inputs = [];
    for (let i = 0; i < this.props.inputs.length; i++) {
      if (this.props.inputs[i].value == this.props.realValue) {
        inputs.push(<option key={i} value={this.props.inputs[i].value} />);
      } else {
        inputs.push(<option key={i} value={this.props.inputs[i].value} />);
      }
    }

    let moreProps = {};

    if (this.props.realValue) {
      const valueInStore = getByKey(this.props.name);
      if (valueInStore == "@@IMCR@@") {
        moreProps.value = this.props.realValue;
      } else {
        moreProps.value = valueInStore;
      }
    }
    return (
      <div class={"IMCRField"}>
        {" "}
        {this.props.label}:
        <input
          list={this.props.name}
          {...this.props}
          onChange={(event) =>{ 
            set(event.target.name, event.target.value); 
            this.forceUpdate();}}
          {...moreProps}
        />
        <datalist id={this.props.name}>{inputs}</datalist>
      </div>
    );
  }
}
