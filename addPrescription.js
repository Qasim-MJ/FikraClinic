import React, { Component } from 'react'
import Context from './context.js'
import styled from 'styled-components';
import { TextInput, Pane, Dialog, Autocomplete } from 'evergreen-ui'
import allDrugs from './allDrugs.js'
import moment from 'moment'

var todayDate = moment().format('YYYY-MM-DD')

let StyledTextInput = styled(TextInput)`
      height :30px;
    width:95%;
    background-color:white;
    font-size:1.3rem;
    margin:10px;
    padding:20px;
`
let AddPresButton = styled.button`
    height :50px;
    width:230px;
    background-color:#FF8484;
    font-size : 20px;
    color: #fff;
    font-weight : bold ;
`

let AddPrescriptionDiv = styled.div`
    display : flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

class AddPrescription extends Component {
    constructor() {
        super()
        this.state = {
            isShown: false,
            newPres: {
                date: todayDate,
                patientName: '',
                age: '',
                diagnosis: '',
                drugs: ''


            }
        }
    }

    render() {
        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <Pane>
                                <Dialog
                                    isShown={this.state.isShown}
                                    title="Add Prescription"
                                    onCloseComplete={() => this.setState({ isShown: false })}
                                    confirmLabel="Add"
                                    onConfirm={(close) => {
                                        ctx.actions.updateNewPrescription(this.state.newPres)
                                        close()
                                        setTimeout(() => { ctx.actions.updatePrescriptions() }, 1000);
                                        this.setState({
                                            newPres: {
                                                date: todayDate,
                                                patientName: '',
                                                age: '',
                                                diagnosis: '',
                                                drugs: ''


                                            }
                                        })
                                    }
                                    }
                                >
                                    <AddPrescriptionDiv>
                                        <StyledTextInput type="Date"
                                            value={this.state.newPres.date}
                                            onChange={(event) => {
                                                this.setState({
                                                    newPres: {
                                                        ...this.state.newPres,
                                                        date: event.target.value
                                                    }

                                                })
                                            }}
                                        />
                                        <StyledTextInput placeholder="Patient Name"
                                            value={this.state.newPres.patientName}
                                            onChange={(event) => {
                                                this.setState({
                                                    newPres: {
                                                        ...this.state.newPres,
                                                        patientName: event.target.value
                                                    }
                                                })
                                            }}
                                        />
                                        <StyledTextInput placeholder="Age"
                                            value={this.state.newPres.age}
                                            onChange={(event) => {
                                                this.setState({
                                                    newPres: {
                                                        ...this.state.newPres,
                                                        age: event.target.value
                                                    }
                                                })
                                            }}
                                        />
                                        <StyledTextInput placeholder="Diagnosis"
                                            value={this.state.newPres.diagnosis}
                                            onChange={(event) => {
                                                this.setState({
                                                    newPres: {
                                                        ...this.state.newPres,
                                                        diagnosis: event.target.value
                                                    }
                                                })
                                            }}
                                        />

                                        <Autocomplete
                                            title="Drugs"
                                            onChange={(changedItem) => {
                                                this.setState({
                                                    newPres: {
                                                        ...this.state.newPres,
                                                        drugs: changedItem
                                                    }
                                                })
                                            }}
                                            items={allDrugs}
                                        >
                                            {(props) => {
                                                const { getInputProps, getRef, inputValue } = props
                                                return (
                                                    <StyledTextInput
                                                        placeholder="Drugs"
                                                        value={inputValue}
                                                        innerRef={getRef}
                                                        {...getInputProps()}
                                                    />
                                                )
                                            }}
                                        </Autocomplete>
                                    </AddPrescriptionDiv>
                                </Dialog>
                                <AddPresButton onClick={() => this.setState({ isShown: true })}>+ Add Prescription</AddPresButton>
                            </Pane>

                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default AddPrescription