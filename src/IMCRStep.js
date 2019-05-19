import React, { Component } from "react";
import { SubmitRecord } from "./IMCRSubmitRecordComponent";
import fields_all from "./fields.json";
import fields_abbott from "./fields-abbott.json";
import * as userService from "./user.service";
import { getByKey } from "./mitraClipRecord";
import logo from "./IMCR-LOGO.png";

export default class IMCRStep extends Component {
  constructor() {
    super();

    this.state = {};

    this.validateForm = this.validateForm.bind(this);
    this.getFields = this.getFields.bind(this);
  }

  validateForm(e) {
    e.preventDefault();

    try {
      if (1 === 1) {
        const allFieldsInStep = this.getFields()[this.props.stepName];

        let doesHaveEmptyValue = false;

        for (let i = 0; i < allFieldsInStep.length; i++) {
          const keyName = Object.keys(allFieldsInStep[i])[0];

          if (getByKey(allFieldsInStep[i][keyName].name) === "@@IMCR@@") {
            doesHaveEmptyValue = true;
            break;
          }
        }

        if (doesHaveEmptyValue) {
          const userResponse = window.confirm(
            "Missing values, do you want to continue?"
          );
          if (userResponse) {
            this.props.nextStep();
          }
        } else {
          this.props.nextStep();
        }
      } else {
        console.log(1);
      }
    } catch (e) {
      console.error(e);
    }
  }

  createNavigationBar(type) {
    const arr = [];

    const keys = Object.keys(this.getFields());
    for (let i = 0; i < keys.length; i++) {
      let classString = "";
      if (i + 1 === this.props.currentStep) {
        classString = "underline";
      }
      if (
        keys[i].toLocaleLowerCase().includes("follow up") &&
        type == "follow up"
      ) {
        arr.push(
          <li class={classString}>
            <a href="#" onClick={() => this.props.goToStep(i + 1)}>
              {keys[i]}
            </a>
          </li>
        );
      } else if (
        type === "regular" &&
        !keys[i].toLocaleLowerCase().includes("follow up")
      ) {
        arr.push(
          <li class={classString}>
            <a href="#" onClick={() => this.props.goToStep(i + 1)}>
              {keys[i]}
            </a>
          </li>
        );
      }
    }
    return arr;
  }

  getFields() {
    if (
      userService.getUserType() === userService.KnownType.administratorAccount
    ) {
      return fields_abbott;
    } else {
      return fields_all;
    }
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-default navbar-fixed-top">
          <div
            class="container-fluid"
            style={{ "justify-content": "flex-start" }}
          >
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                <img className="logo" src={logo} alt={"IMCR"} />
              </a>
            </div>
            <ul class="nav navbar-nav" style={{ "flex-direction": "row" }}>
              {this.createNavigationBar("regular")}
            </ul>
            <ul class="nav navbar-nav" style={{ "flex-direction": "row" }}>
              {this.createNavigationBar("follow up")}
            </ul>
          </div>
        </nav>
        <div className="card1">
          <h3 style={{ margin: "1em" }}>{this.props.stepName}</h3>
          <form class="step-form" ref={form => (this.form = form)}>
            {this.props.children}
          </form>

          {this.props.currentStep > 1 ? (
            <button
              class="btn btn-info"
              style={{ width: "160px", "margin-top": ".5em" }}
              onClick={this.props.previousStep}
            >
              Previous Step
            </button>
          ) : null}
          {this.props.currentStep < this.props.totalSteps &&
          this.props.currentStep != 8 &&
          this.props.currentStep != 10 &&
          this.props.currentStep != 12 ? (
            <button
              style={{ width: "160px", "margin-top": ".5em" }}
              class="btn btn-primary"
              onClick={this.validateForm}
            >
              Next Step
            </button>
          ) : null}

          {this.props.currentStep == 8 ||this.props.currentStep == 10 ||this.props.currentStep == 12 ||this.props.currentStep == 14 ||
          this.props.stepName === "Procedure Data" ? (
            <SubmitRecord />
          ) : null}

          {this.props.stepName !== "Procedure Data" ? (
            <p class="text-center" style={{ "margin-top": ".5em" }}>
              {this.props.currentStep} / {this.props.totalSteps}
            </p>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}
