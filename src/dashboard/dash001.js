import React, { PureComponent } from 'react'
import Fullscreen from "react-full-screen";
import '../dashboard/dash001.css'
import AuthService from './../authlogin/AuthService'
import withAuth from './../authlogin/withAuth'
import Card001 from './sections/Card001'
import ChartSection1 from './sections/ChartSection1'
import BarChart from './sections/BarChart'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBModal,
    MDBModalBody,
    MDBModalFooter, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardImage
} from 'mdbreact';
import './../dashboard/dash001.css'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://27.131.138.143:8014")
class Dash001 extends PureComponent {
    constructor(props) {
        super(props)
        this.Auth = new AuthService();
        this.state = {
            login: false,
            value: '',
            isFull: false,
        }
    }

    render() {


        return (
            <>
                <React.Fragment>
                    <MDBContainer fluid>
                        <Card001 socket={socket} />
                        <ChartSection1 socket={socket} />
                        <BarChart socket={socket} />
                    </MDBContainer>
                </React.Fragment>
            </>
        )
    }

}

export default withAuth(Dash001)