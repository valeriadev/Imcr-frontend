import React, {Component} from 'react';
import moment from 'moment';
import logo from "./IMCR-LOGO.png";
import IMCRInput from "./ImcrInputComponent";
import IMCRRadio from "./IMCRRadioComponent";
import IMCRListOptions from "./IMCRListComponent";
import IMCRTextarea from "./IMCRTextareaComponent";
import {SubmitRecord} from "./IMCRSubmitRecordComponent"

export default class StepOne extends Component {
    constructor() {
        super();

        this.state = {
            firstDate: '',
            secondDate: '',
            validDates: '',
            age: '',
            bmi: '',
            height: '',
            weight: '',
            bsa:'',
            helper:'',
            Age:{
                label:"Age", type:"number", name:"quantity", min:"1", max:"130"
            },
            Hospital: {
                label:"Hospital", list:"Hospital", name:"hospitals", inputs:["Kaplan Medical Center","Hadasa"], required:"true"
            },
            Gender:{
                label:"Gender ", inputs:
                    [{type:"radio", name:"gender", value:"0", label: " Male "},
                        {type:"radio", name:"gender", value:"1", label:" Female "}]
            },
            Birthday: {label:"Birthday " ,type:"month", name:"bdaymonth"},
            Height: {label:"Height (cm) ", type:"number", name:"height", onChange:this.heightChanged, min:"50", max:"260"}

        };
        this.firstDateChanged = this.firstDateChanged.bind(this);
        this.secondDateChanged = this.secondDateChanged.bind(this);
        this.isValidDates = this.isValidDates.bind(this);
        this.heightChanged=this.heightChanged.bind(this);
        this.weightChanged=this.weightChanged.bind(this);
        this.calculateBMI=this.calculateBMI.bind(this);
        this.calculateBSA=this.calculateBSA.bind(this);


    }

    heightChanged(event){
        console.log('Height: '+event.target.value);
        this.setState({
            height: event.target.value
        });
        this.calculateBMI();
        this.calculateBSA();
    }

    weightChanged(event){
        console.log('Weight: '+event.target.value);
        this.setState({
            weight: event.target.value
        });
        this.calculateBMI();
        this.calculateBSA();
    }

    calculateBMI(){
      if(this.state.height && this.state.weight)
      {this.setState({
          bmi: ((this.state.weight) / ((((this.state.height)/100) * ((this.state.height)/100))))*10

      });
      }
    }

    calculateBSA(){
       /* (BSA = 0.007184 * W^0.425 * H^0.725)*/

        if(this.state.height && this.state.weight)
        {this.setState({
            helper: (this.state.height*this.state.weight/3600),
            bsa: (Math.sqrt(this.state.helper))
        });
        }
    }

    firstDateChanged(event) {
        console.log('firstDateChanged: ' + event.target.value);
        this.setState({
            firstDate: event.target.value
        });
    }

    secondDateChanged(event) {
        console.log('secondDateChanged: ' + event.target.value);
        this.setState({
            secondDate: event.target.value
        });
    }

    isValidDates(event) {
        console.log('isValidDates: ' + event.target.value);
        if (moment(this.state.firstDate).isBefore(this.state.secondDate, 'year')) {
            this.setState({
                validDates: event.target.value
            });
        }
        else {
            console.log("invalid dates " + this.state.firstDate + '  ' + this.state.secondDate + '  ' + moment.duration(moment(this.state.firstDate).diff(moment(this.state.secondDate))))
        }
        ;


    }

    render() {
        return (

            <div className={"first"}>
                <img className="logo_step" src={logo} alt={"IMCR"}/>
                <ul className="steps">
                    <li className="is-active">Step 1</li>
                    <li>Step 2</li>
                    <li>Step 3</li>
                </ul>
                <form className="form-wrapper">
                    <div className={"card"}>
                        <IMCRListOptions {...this.state.Hospital}/>
                    </div>
                    <div className={"card"}>
                    <IMCRTextarea label="Notes" rows = "5" cols = "60" name = "description"/>
                    </div>
                    <div className={"card"}>
                        <div> Birthday (month and year): <input type="month" name="bdaymonth"/></div>
                        <IMCRInput {...this.state.Birthday}/>
                        {/*<div> Age: <input type="number" name="quantity" min="1" max="120"/></div>*/}
                        {/*<IMCRInput label="Age" type="number" name="quantity" min="1" max="120" iloveyou="1"/>*/}

                        <IMCRInput {...this.state.Age}/>
                        <IMCRRadio {...this.state.Gender}/>
                        <IMCRInput {...this.state.Height}/>
                        <div> Height (cm): <input type="number" name="height" onChange={this.heightChanged} min="50" max="260"/></div>
                        <div> Weight (kg): <input type="number" name="weight" onChange={this.weightChanged} min="3" max="300"/></div>
                        <div> BMI: {this.state.bmi}</div>
                        <div> BSA: {this.state.bsa}</div>
                        <SubmitRecord/>
                    </div>

                    <div className={"card"}>

                        <div> CAD: no <input type="radio" name="CAD" value="0"/>
                            yes <input type="radio" name="CAD" value="1"/></div>
                        <div> Previous MitraClip: no <input type="radio" name="PreviousMitraClip" value="0"/>
                            yes <input type="radio" name="PreviousMitraClip" value="1"/></div>

                        <div>PreviousMitraClip? (another name)<input list="previousMitraClip" name="previousMC"/>
                            <datalist id="previousMitraClip">
                                <option value="urgent"/>
                                <option value="emergent"/>
                                <option value="elective"/>
                                <option value="undefined? (needed?)"/>
                            </datalist>
                        </div>

                        <div> Assist deviceat the time of Mitraclip: no <input type="radio"
                                                                               name="Assist_deviceat_the_time_of_Mitraclip"
                                                                               value="0"/>
                            yes <input type="radio" name="Assist_deviceat_the_time_of_Mitraclip" value="1"/></div>

                        <div> IABP at the time of the Mitraclip: no <input type="radio"
                                                                           name="IABP_at_the_time_of_the_Mitraclip"
                                                                           value="0"/>
                            yes <input type="radio" name="IABP_at_the_time_of_the_Mitraclip" value="1"/></div>


                        <div> Recent Cardiogenic shock (within 30 days): no <input type="radio"
                                                                                   name="Recent_Cardiogenic_shock"
                                                                                   value="0"/>
                            yes <input type="radio" name="Recent_Cardiogenic_shock" value="1"/></div>


                        <div> Recent IABP (within 30 days): no <input type="radio" name="Recent_IABP" value="0"/>
                            yes <input type="radio" name="Recent_IABP" value="1"/></div>


                        <div> Recent Acute MI (within 30 days): no <input type="radio" name="Recent_Acute_MI"
                                                                          value="0"/>
                            yes <input type="radio" name="Recent_Acute_MI" value="1"/></div>

                        <div> Recent PCI (within 30 days): no <input type="radio" name="Recent_PCI" value="0"/>
                            yes <input type="radio" name="Recent_PCI" value="1"/></div>


                        <div> Recent PCI (within 30 days): no <input type="radio" name="Recent_PCI" value="0"/>
                            yes <input type="radio" name="Recent_PCI" value="1"/></div>


                        <div> Recent HF hospitaliztion (within 30 days): no <input type="radio"
                                                                                   name="Recent_HF_hospitaliztion"
                                                                                   value="0"/>
                            yes <input type="radio" name="Recent_HF_hospitaliztion" value="1"/></div>


                        <div> Post MI: no <input type="radio" name="Post_MI" value="0"/>
                            yes <input type="radio" name="Post_MI" value="1"/></div>

                        <div> Post PCI: no <input type="radio" name="Post_PCI" value="0"/>
                            yes <input type="radio" name="Post_PCI" value="1"/></div>


                        <div>Cardiomyopathy: <input list="cardiomyopathy" name="Cardiomyopathy"/>
                            <datalist id="cardiomyopathy">
                                <option value="0">no</option>
                                <option value="1">DCM</option>
                                <option value="2">ischemic</option>
                                <option value="3">valvular</option>
                            </datalist>
                        </div>


                        <div>Mechanism: <input list="mechanism" name="Mechanism"/>
                            <datalist id="mechanism">
                                <option value="1">Degenrative</option>
                                <option value="2">Functional</option>
                                <option value="3">mixed</option>
                                <option value="4">undefined</option>
                            </datalist>
                        </div>


                        <div> Past CVA/TIA: no <input type="radio" name="Past_CVA_TIA" value="0"/>
                            yes <input type="radio" name="Past_CVA_TIA" value="1"/></div>


                        <div> S/P oncological disease: no <input type="radio" name="SP_oncological_disease" value="0"/>
                            yes <input type="radio" name="SP_oncological_disease" value="1"/></div>

                        <div>Diabetes: <input list="diabetes" name="Diabetes"/>
                            <datalist id="diabetes">
                                <option value="0">no</option>
                                <option value="1">oral</option>
                                <option value="2">insulin</option>
                            </datalist>
                        </div>


                        <div> Hyperlipidemia: no <input type="radio" name="Hyperlipidemia" value="0"/>
                            yes <input type="radio" name="Hyperlipidemia" value="1"/></div>


                        <div> HTN: no <input type="radio" name="HTN" value="0"/>
                            yes <input type="radio" name="HTN" value="1"/></div>


                        <div> Smoking: no <input type="radio" name="Smoking" value="0"/>
                            yes <input type="radio" name="Smoking" value="1"/></div>


                        <div> Asthma: no <input type="radio" name="Asthma" value="0"/>
                            yes <input type="radio" name="Asthma" value="1"/></div>


                        <div> COPD: no <input type="radio" name="COPD" value="0"/>
                            yes <input type="radio" name="COPD" value="1"/></div>


                        <div> OSA: no <input type="radio" name="OSA" value="0"/>
                            yes <input type="radio" name="OSA" value="1"/></div>


                        <div>Pulmonary HTN (Numerical): <input list="pulmonaryHTN" name="PulmonaryHTN"/>
                            <datalist id="pulmonaryHTN">
                                <option value="0">none</option>
                                <option value="1">mild</option>
                                <option value="2">moderate</option>
                                <option value="3">severe</option>
                            </datalist>
                        </div>


                        <div> Past thoracotomy: no <input type="radio" name="Past_thoracotomy" value="0"/>
                            yes <input type="radio" name="Past_thoracotomy" value="1"/></div>


                        <div>Thoracotomy details: <input list="thoracotomy_details" name="Thoracotomy_details"/>
                            <datalist id="thoracotomy_details">
                                <option value="0">none</option>
                                <option value="1">CABG</option>
                                <option value="2">AVR</option>
                                <option value="3">TVR</option>
                                <option value="4">others</option>
                            </datalist>
                        </div>


                        <div>Atrial fibrillation/flutter: <input list="atrial_fibrillation_flutter"
                                                                 name="Atrial_fibrillation_flutter"/>
                            <datalist id="atrial_fibrillation_flutter">
                                <option value="0">no</option>
                                <option value="1">paf</option>
                                <option value="2">caf</option>
                            </datalist>
                        </div>


                        <div>S/P Permanent pacemaker: <input list="sp_Permanent_pacemaker"
                                                             name="SP_Permanent_pacemaker"/>
                            <datalist id="sp_Permanent_pacemaker">
                                <option value="0">no</option>
                                <option value="1">pacemaker</option>
                                <option value="2">CRT</option>
                            </datalist>
                        </div>

                        <div>number of HF hospitalization (last year): <input type="number"
                                                                              name="number_of_HF_hospitalization"
                                                                              min="0" max="100"/></div>

                        <div>number of all hospitaliztions (last year), non elective: <input type="number"
                                                                                             name="number_of_all_hospitaliztions_non_elective"
                                                                                             min="0" max="100"/></div>


                        <div> Frailty: no <input type="radio" name="Past_thoracotomy" value="0"/>
                            yes <input type="radio" name="Past_thoracotomy" value="1"/></div>


                        <div>Mobility: <input list="mobility_list" name="mobility"/>
                            <datalist id="mobility_list">
                                <option value="0">no</option>
                                <option value="1">walker</option>
                                <option value="2">cane</option>
                                <option value="3">wheelchair</option>
                                <option value="4">bedridden</option>
                            </datalist>
                        </div>


                        <div>Peripheral edema: <input list="peripheral_edema_list" name="peripheral_edema"/>
                            <datalist id="peripheral_edema_list">
                                <option value="0">no</option>
                                <option value="1">ankle</option>
                                <option value="2">shin</option>
                                <option value="3">thigh</option>
                                <option value="4">anasarca</option>
                            </datalist>
                        </div>


                        <div>FC NYHA (1-4): <input type="number" name="FC_NYHA" min="1" max="4"/></div>

                        <div>6MWT (meters): Men (6 MWD = 1140 m – (5.61 × BMI) – (6.94 × age)
                            Women: 6 MWD = 1017 m – (6.24 × BMI) – (5.83 × age)) <input type="number" name="sixMWT"/>
                        </div>

                        <div>Worst measured MR (TTE o TEE)???: <input type="number" name="FC_NYHA"/></div>
                    </div>
                    <div className={"card"}>

                        <div> Antiplatelets: no <input type="radio" name="antiplatelets" value="0"/>
                            yes <input type="radio" name="antiplatelets" value="1"/></div>


                        <div> Anticoagulants: no <input type="radio" name="anticoagulants" value="0"/>
                            yes <input type="radio" name="anticoagulants" value="1"/></div>


                        <div> ACE-I / ARB: no <input type="radio" name="ACE_I_ARB" value="0"/>
                            yes <input type="radio" name="ACE_I_ARB" value="1"/></div>


                        <div> Beta blockers: no <input type="radio" name="beta_blockers" value="0"/>
                            yes <input type="radio" name="beta_blockers" value="1"/></div>


                        <div> Digoxin: no <input type="radio" name="digoxin" value="0"/>
                            yes <input type="radio" name="digoxin" value="1"/></div>


                        <div> Pulmonary Vasodilators: no <input type="radio" name="pulmonary_Vasodilators" value="0"/>
                            yes <input type="radio" name="pulmonary_Vasodilators" value="1"/></div>


                        <div> Fusid per os: no <input type="radio" name="fusid_per_os" value="0"/>
                            yes <input type="radio" name="fusid_per_os" value="1"/></div>


                        <div>Fusid per os dosage: <input type="number" name="fusid_per_os_dosage" min="0" max="600"/>
                        </div>


                        <div> Fusid IV daycare: no <input type="radio" name="fusid_IV_daycare" value="0"/>
                            yes <input type="radio" name="fusid_IV_daycare" value="1"/></div>

                        <br/>
                    </div>
                    <div className={"card"}>

                        <div><b> Risk of surgery</b></div>


                        <div>Euroscore2 (%): <input type="number" name="euroscore2" min="0" max="100"/></div>
                        <div>STS score- for MV repair mortality: <input type="number" name="sts_score" min="0"
                                                                        max="100"/></div>
                    </div>


                    <div className={"card"}>

                        <div><b>lab test</b></div>

                        <div>Hemoglobin (g/dL): <input type="number" name="hemoglobin" min="0" max="100"/></div>
                        <div>Creatinine (micromol/l): <input type="number" name="creatinine" min="0" max="100"/></div>
                        <div>Albumin g/L: <input type="number" name="albumin" min="0" max="100"/></div>
                        <div>GFR: <input type="number" name="GFR" min="0" max="100"/></div>
                        <div>BNP: <input type="number" name="BNP" min="0" max="100"/></div>
                        <div>ProBNP: <input type="number" name="ProBNP" min="0" max="100"/></div>
                    </div>
                    <div className={"card"}>

                        <div>Notes: <input type="text" name="notes"/><br/></div>
                    </div>
                </form>
            </div>

        );
    }
}

