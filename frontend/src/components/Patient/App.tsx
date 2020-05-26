import { Component } from "react";
import React from "react";
import { PForm } from "./PForm";
import { PatientPage } from "./PatientPage";

interface IAppState {
  user: {
    first_name: string;
    uid: string;
  };
}

interface IAppProps {
  socket: SocketIOClient.Socket
}

const PatientContext = React.createContext({ user: {first_name: "N/A", uid: "N/A"} });

export class App extends Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
    const previous_state = localStorage.getItem('loggedInUser');
    this.state = previous_state === null ? {user: {first_name: "N/A"}} : JSON.parse(previous_state);
  }

  loginUser(name : string, id: string) {
      const new_state = {user: {first_name: name, uid: id}};
      localStorage.setItem('loggedInUser', JSON.stringify(new_state));
      this.setState(new_state, () => {
        console.log("Post-login state set");
        this.props.socket.emit("login", {'hash': id})
      });
  }

  render() {
    return (
      <PatientContext.Provider value={this.state}>
        <PatientContext.Consumer>
          {value =>
            value.user.first_name === "N/A"? (
              <PForm socket={this.props.socket} loginUser={this.loginUser.bind(this)} />
            ) : (
              <PatientPage socket={this.props.socket} user={value.user} />
            )
          }
        </PatientContext.Consumer>
      </PatientContext.Provider>
    );
    /*
    return (
      <PatientContext.Provider value={this.state}>
        <Tabs id="patient-tabs">
          <Tab eventKey="new" title="New Patient">
              <PatientContext.Consumer>
                {(value) => (value == {} ? <PForm /> : <PatientPage first_name={value.first_name}/>)}
              </PatientContext.Consumer>
          </Tab>
          <Tab eventKey="other" title="Other Patients">
            <List />
          </Tab>
          <Tab eventKey="notif" title="Notifications">
            <NotificationArea />
          </Tab>
        </Tabs>
      </PatientContext.Provider>
    );*/
  }
}
