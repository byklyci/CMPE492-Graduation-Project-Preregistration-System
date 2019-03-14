import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import boun from "./resources/bogazici.jpg";
console.log(boun);
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentJob: "",
      jobPicked: false
    };
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler(event) {
    this.setState({
      currentJob: event.target.name
    });
  }

  render() {
    return (
      <div>
        <img
          src={boun}
          alt="Logo"
          style={{
            overflowY: "auto",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundSize: "cover",
            zIndex: -1,
            width: "100%",
            height: "100%"
          }}
        />
        <div style={{ width: "100%", height: "100%", position:"absolute", top: 0, left: 0, backgroundColor: "#00000090" }} />
        <div
          style={{
            top: "35%",
            left: "35%",
            position: "absolute",
            width: 500,
            height: 300,
            backgroundColor: "#FFFFFF90",
            zIndex: 20,
            borderRadius: 10,
            textAlign: "center",
            paddingTop: "5%",
            opacity: 10
          }}
        >
          <button
            style={{
              width: 100,
              height: 30,
              borderRadius: 5,
              backgroundColor: "#5bc0de",
              marginRight: 10,
              borderWidth: 0
            }}
            name="Signin"
            onClick={this.buttonHandler}
          >
            Sign in
          </button>
          <button
            style={{ width: 100, height: 30, borderRadius: 5, backgroundColor: "#5bc0de", borderWidth: 0 }}
            name="Signup"
            onClick={this.buttonHandler}
          >
            Sign up
          </button>
          <br />
          <br />
          {this.state.currentJob != null && <Login currentJob={this.state.currentJob} />}
        </div>
      </div>
    );
  }
}

export default App;
