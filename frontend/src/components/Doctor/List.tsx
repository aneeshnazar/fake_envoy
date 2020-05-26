import { Component } from "react";
import React from "react";
import { ListElement } from "./ListElement";
import { Container } from "react-bootstrap";

interface IListProps {
  update: (id: string) => void;
  socket: SocketIOClient.Socket;
}

interface IListState {
  changed: boolean;
  items: {
    id: number;
    first_name: string;
    last_name: string;
    description: string;
    check_in_time: string;
    hash: string
  }[];
}

export class List extends Component<IListProps, IListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      changed: false,
      items: []
    };
  }

  populateList() {
    fetch("http://localhost:8000/api/doctor/patients")
      .then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(res => {
            this.setState({ items: res.data, changed: false });
          })
          .catch(e => {
            console.log(e);
          })
      )
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.populateList();
    this.props.socket.on("doctor", () => {
      console.log("Recieved doctor message");
      this.populateList()
    })
  }

  removeId(uid: number) {
    this.setState({items: this.state.items.filter((item) => item.id !== uid)})
  }

  render() {
    return (
      <Container className="mt-5 border border-primary rounded-sm">
        <h4>Upcoming Patients:</h4>
        {this.state.items.map((item, i) => (
          <ListElement
            key={i}
            id={item.id}
            name={item.first_name + " " + item.last_name}
            description={item.description}
            check_in_time={item.check_in_time}
            update={this.props.update}
            remove={this.removeId.bind(this)}
            hash={item.hash}
            socket={this.props.socket}
          />
        ))}
      </Container>
    );
  }
}
