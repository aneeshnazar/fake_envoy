import { Component } from "react";
import React from "react";
import { Container } from "react-bootstrap";
import { ListElement } from "./ListElement";

interface IListState {
  changed: boolean;
  items: {
    first_name: string;
    last_name: string;
    check_in_time: string;
  }[];
}

interface IListProps {
  current_uid: string,
  socket: SocketIOClient.Socket
}

export class List extends Component<IListProps, IListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      changed: false,
      items: [
      ]
    };
  }

  componentDidMount() {
    this.updatePatientList();
    this.props.socket.on("patient", () => {
      console.log("Recieved patient message");
      this.updatePatientList()
    })
  }

  updatePatientList() {
    fetch("http://localhost:8000/api/patients")
      .then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(res => {
            this.setState({ items: res.data, changed: false }, () => {
              console.log("Fetching patient list");
            });
          })
          .catch(e => {
            console.log(e);
          })
      )
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Container>
        <h4>Other Patients:</h4>
        {this.state.items.map((item, i) => (
          <ListElement
            key={i}
            first_name={item.first_name}
            last_initial={item.last_name}
            check_in_time={item.check_in_time}
          />
        ))}
      </Container>
    );
  }
}
