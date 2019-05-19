import React, { Component } from "react";
import { set, getByKey } from "./mitraClipRecord";

export default class IMCRRadio extends Component {
  render() {
    let inputs = [];
    for (let i = 0; i < this.props.inputs.length; i++) {
      let moreData = {};
      if (this.props.realValue) {
        const valueInStore = getByKey(this.props.name);

        if (valueInStore && valueInStore != "@@IMCR@@") {
          moreData.value = valueInStore;
        } else {
          moreData.value = this.props.realValue;
        }
      } else {
        const valueInStore = getByKey(this.props.name);
        if(valueInStore && valueInStore != "@@IMCR@@") {
          moreData.value = valueInStore;

        }
      }

      inputs.push([
        <label
          style={{ "min-width": "8em", "font-size": "medium" }}
          class="radio-inline"
          htmlFor={i}
        >
          {this.props.inputs[i].label}
          <input
            style={{ width: "33%" }}
            class="radio"
            onChange={event => {
              if (event.target.checked) {
                set(event.target.name, event.target.value);
                this.forceUpdate();
              }
            }}
            id={i}
            {...this.props.inputs[i]}
            name={this.props.name}
            checked={this.props.inputs[i].value == moreData.value}
          />{" "}
        </label>
      ]);
    }
    return (
      <div
        style={{ "margin-left": "1.5em" }}
        class={"d-flex justify-content-between bd-highlight mb-3"}
      >
        <label style={{ "padding-right": "1em" }}>{this.props.label}</label>
        <div>{inputs}</div>
      </div>
    );
  }
}
