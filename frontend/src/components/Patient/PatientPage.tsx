import { Component } from "react";
import { NotificationArea } from "./NotificationArea";
import React from "react";
import { List } from "./List";

interface IPatientPageProps {
    user : {
        first_name: string,
        uid: string
    },
    socket: SocketIOClient.Socket
}

export class PatientPage extends Component<IPatientPageProps, {}> {
    render() {
        return (
            <div>
                Hello {this.props.user.first_name}
                <List socket={this.props.socket} current_uid={this.props.user.uid} />
                <NotificationArea socket={this.props.socket} current_uid={this.props.user.uid} />
            </div>
        )
    }
}