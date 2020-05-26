import { Component } from "react";
import React from "react";
import { Row, Col } from "react-bootstrap";

export interface IListElementProps {
    first_name: string,
    last_initial: string,
    check_in_time: string
}

export class ListElement extends Component<IListElementProps, {}> {
     render() {
        return (
            <Row>
                <Col>{this.props.first_name} {this.props.last_initial}.</Col>
                <Col>{this.props.check_in_time}</Col>
            </Row>
        )
    }
}