import { Component } from "react";
import React from "react";
import { List } from "./List";
import { Current } from "./Current";
//import { Tabs, Tab } from "react-bootstrap";

interface IAppState {
    first_name: string,
    last_name: string,
    description: string,
    email: string
}

interface IAppProps {
    socket: SocketIOClient.Socket
}

export class App extends Component<IAppProps, IAppState> {
    constructor(props: any) {
        super(props);
        const previous_state = localStorage.getItem('currentPatient');
        console.log(previous_state);
        
        this.state = previous_state === null ? {
            first_name: "N/A",
            last_name: "N/A",
            description: "N/A",
            email: "N/A"
        } : JSON.parse(previous_state);
    }

    updateCurrent(id: string) {
        fetch('http://localhost:8000/api/doctor/' + id).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
            ).then(res => {                
                localStorage.setItem('currentPatient', JSON.stringify(res.data));
                this.setState(res.data)
                console.log("Updated current");
            }).catch(e => {
                console.log(e);
            })
        ).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <Current
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    description={this.state.description}
                    email={this.state.email} />
                <List socket={this.props.socket} update={this.updateCurrent.bind(this)} />
            </div>
        )
    }
}