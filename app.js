import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import BackgroundImage from './background.png'
import firebase from 'firebase'
import Context from './context.js'
import PrescriptionsPage from './prescriptionsPage'

var config = {
    apiKey: "AIzaSyDp-BK1w5erUo951tRdl1HXZU1OROV3lSI",
    authDomain: "fikraclinic.firebaseapp.com",
    databaseURL: "https://fikraclinic.firebaseio.com",
    projectId: "fikraclinic",
    storageBucket: "fikraclinic.appspot.com",
    messagingSenderId: "446923328534"
  };

firebase.initializeApp(config)


class App extends Component {
    constructor(){
        super()
        this.state = {
            prescriptions : [],
            newPrescription: {}
        }

        firebase.firestore().collection('prescriptions')
        .onSnapshot((prescriptions)=>{
            let pres =[]
            prescriptions.forEach((item)=>{
                pres.push({id : item.id , data : item.data()})
            })
            this.setState({
                prescriptions : pres
            })
        })
    }
    render() {
        return (
            <Context.Provider value={{
                state : this.state,
                actions:{
                    updatePrescriptions: ()=>{

                        firebase.firestore().collection('prescriptions').add(this.state.newPrescription)
            
                        this.setState({
                          newPrescription: {}
                        })
            
                        
                      },
                    updateNewPrescription: (newPres)=>{
                        this.setState({
                            newPrescription : newPres
                        })
                        console.log(newPres)
                    }
                }
               
            }}>
                <PrescriptionsPage />
            </Context.Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))