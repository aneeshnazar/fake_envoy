import { Component } from "react";
import React from "react";

interface ICurrentProps {
    first_name: string,
    last_name: string,
    description: string,
    email: string
}

export class Current extends Component<ICurrentProps, {}> {
    render() {
        return (
            <div>
                <h5>{this.props.first_name} {this.props.last_name}</h5>
                <h2>
                    {this.props.description}
                </h2>
                <h5>{this.props.email}</h5>
            </div>
        )
    }
}