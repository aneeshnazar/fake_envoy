import { Component, ChangeEvent, FormEvent } from "react";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import hash from "object-hash";

interface IPFormState {
  first_name: string;
  last_name: string;
  email: string;
  description: string;
}

interface IPFormProps {
  loginUser: (name: string, id: string) => void,
  socket: SocketIOClient.Socket
}

export class PForm extends Component<IPFormProps, IPFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      description: ""
    };
  }

  handleNewPatient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData();
    const id = hash(this.state.first_name + this.state.last_name + Date.now().toString() + this.state.email);
    data.append("first_name", this.state.first_name);
    data.append("last_name", this.state.last_name);
    data.append("description", this.state.description);
    data.append("email", this.state.email);
    data.append("hash", id);

    fetch("http://localhost:8000/api/patients", {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
      },
      body: data,
      method: "POST",
      mode:"no-cors" as RequestMode
    })
      .then(e => {
        console.log("Submitted!");
        console.log(e);
        this.props.loginUser(this.state.first_name, id);
      })
      .catch((e: any) => console.log(e));
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    let change: any = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  render() {
    return (
      <Form onSubmit={this.handleNewPatient.bind(this)}>
        <Container className="my-3">
          <Form.Group controlId="formFirstName">
            <Row>
              <Col>
                <Form.Label>First Name: </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="first_name"
                  onChange={this.handleChange.bind(this)}
                  type="text"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Row>
              <Col>
                <Form.Label>Last Name: </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="last_name"
                  onChange={this.handleChange.bind(this)}
                  type="text"
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Row>
              <Col>
                <Form.Label>Email: </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="email"
                  onChange={this.handleChange.bind(this)}
                  type="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Row>
              <Col>
                <Form.Label>Description of Condition: </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  name="description"
                  onChange={this.handleChange.bind(this)}
                  as="textarea"
                  placeholder="Enter a short description of your condition"
                  value={this.state.description}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Container>
      </Form>
    );
  }
}
