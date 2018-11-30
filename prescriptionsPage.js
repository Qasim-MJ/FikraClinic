import React, { Component } from 'react'
import Context from './context.js'
import styled from 'styled-components';
import BackgroundImage from './background.png'
import printIcon from './printicon.png'
import { Pane, Button, Dialog } from 'evergreen-ui'
import AddPrescription from './addPrescription.js'
import { Page, Text, View, Document, StyleSheet, ReactPDF, PDFViewer } from '@react-pdf/renderer';





// Create Document Component
class MyDocument extends Component {
    render() {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Date : {this.props.date}</Text>
                        <Text>Patient Name {this.props.patientName}</Text>
                        <Text>Age : {this.props.age}</Text>
                        <Text>Diagnosis {this.props.diagnosis}</Text>
                        <Text>Drugs :{this.props.drugs}</Text>

                    </View>
                </Page>
            </Document>
        )
    }
};


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const PDF = () => (
    <PDFViewer>
        <MyDocument />
    </PDFViewer>
);



let Background = styled.div`
    background-image: url(${BackgroundImage});
   
`
let HeaderDiv = styled.header`
    height : 100px;
    display: flex;
    align-items:center;
    justify-content:space-between;
    max-width:1120px;
    margin:0 auto;
    flex-wrap:wrap;


`


let AllPresLabel = styled.label`
    font-size:2rem;
    color: #838383;
`

let PrescriptionsDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:row;
    flex-wrap:wrap;
    max-width:1280px;
    margin:0 auto;
`

let RedText = styled.p`
    color : #FF8484;
    font-size: 1.3rem;
    display:inline;

`

let NameText = styled.p`
    color : #000;
    font-size: 1.5rem;
    display:inline;

`
let DateText = styled.p`
    color : #8D8D8D;
    font-size: 1rem;
    display:inline;

`

let PresCard = styled.div`
  font-size: 1.3rem;
  color: #8D8D8D;
  background-color:white ;
  box-shadow: 0px 10px 20px gray;
  margin : 40px;
  padding : 10px;
  min-height:300px;
  min-width:300px;
  max-width:300px;
`
let PrintDiv = styled.div`
    width : 100%;
    display:flex;
    align-items:center;
    justify-content : center;
    flex-direction:column;
    height : 200px;
`
let PrintIcon = styled.img`
width : 100px;
`
let DisplayNonePDFViewer = styled(PDFViewer)`
    display:none;
`
let PrintButton = styled(Button)``
class Header extends Component {

    render() {
        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <HeaderDiv>
                                <AllPresLabel>
                                    All Prescriptions
                                </AllPresLabel>

                                <AddPrescription />
                            </HeaderDiv>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}


class PrescriptionsList extends Component {
    constructor() {
        super()
        this.state = {
            isShown: false,
            currentComponentID: ""
        }

    }

    render() {
        return (
            <Context.Consumer>
                {
                    (ctx) => {
                        return (
                            <PrescriptionsDiv>
                                {
                                    ctx.state.prescriptions.map((item, i) => {
                                        return (
                                            <PresCard key={i}>
                                                <div><DateText>{item.data.date}</DateText></div>
                                                <div><NameText>{item.data.patientName}</NameText></div>
                                                <div>Age: {item.data.age}</div>
                                                <div>Diagnosis: <RedText>{item.data.diagnosis}</RedText></div>
                                                <div>Drugs: <RedText>{item.data.drugs}</RedText></div>

                                                <DisplayNonePDFViewer className={item.id}>
                                                    <MyDocument
                                                        date={item.data.date}
                                                        patientName={item.data.patientName}
                                                        age={item.data.age}
                                                        diagnosis={item.data.diagnosis}
                                                        drugs={item.data.drugs}
                                                    />
                                                </DisplayNonePDFViewer>
                                                <PrintDiv>

                                                    <PrintIcon onClick={() => {
                                                        open(document.getElementsByClassName(item.id)[0].src)
                                                    }} src={printIcon} />
                                                </PrintDiv>

                                            </PresCard>
                                        )
                                    })
                                }

                            </PrescriptionsDiv>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}
class PrescriptionsPage extends Component {
    render() {
        return (
            <Background>
                <Header />
                <PrescriptionsList />
            </Background>

        )
    }
}

export default PrescriptionsPage