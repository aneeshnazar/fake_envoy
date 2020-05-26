import { Component } from "react";
import React from "react";

interface INotif {
  notify: boolean;
}

interface INotifProps {
  socket: SocketIOClient.Socket,
  current_uid: string
}

export class NotificationArea extends Component<INotifProps, INotif> {
  constructor(props: any) {
    super(props);
    this.state = {
      notify: false
    };
  }

  componentDidMount() {
    this.props.socket.on("notify", () => {
      console.log("Received notify message");
      this.changeNotify()
    })
  }

  changeNotify() {
    this.setState({ notify: !this.state.notify });
  }

  render() {
    return (
      <div>
        {this.state.notify ? (
          <p>The doctor will see you now</p>
        ) : (
          <p>No notifications</p>
        )}
      </div>
    );
  }
}
