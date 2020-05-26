import { Component } from "react";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface IListElementProps {
    id: number,
    name: string,
    description: string,
    check_in_time: string,
    hash: string,
    socket: SocketIOClient.Socket,
    update: (id: string) => void,
    remove: (id: number) => void;
}

export class ListElement extends Component<IListElementProps, {}> {
    handleNext() {
        this.props.update(this.props.id.toString());
        fetch("http://localhost:8000/api/doctor/" + this.props.id.toString(), {
            method: "DELETE"
        }).then(() => {
            console.log("Sending next message");
            this.props.socket.emit("next", {'hash': this.props.hash});
        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        return (
            <Row className="border-top border-primary">
                <Col>
                    {this.props.name}
                </Col>
                <Col>
                    {this.props.description}
                </Col>
                <Col>{this.props.check_in_time}</Col>
                <Col><Button onClick={this.handleNext.bind(this)}>See Next</Button></Col>
            </Row>
        )
    }
}