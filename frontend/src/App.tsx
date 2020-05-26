import React, { Component } from "react";
import "./App.css";
import { App as DoctorView } from "./components/Doctor/App";
import { App as PatientView } from "./components/Patient/App";
import { Tabs, Tab } from "react-bootstrap";
import io from "socket.io-client";

export default class App extends Component<{}, {}> {
  socket: SocketIOClient.Socket;
  constructor(props: any){
    super(props)
    this.socket = io('http://localhost:5000/notification')
  }

  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="patient" id="home-tabs">
          <Tab eventKey="doctor" title="Doctor">
            <DoctorView socket={this.socket} />
          </Tab>
          <Tab eventKey="patient" title="Patient">
            <PatientView socket={this.socket} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
