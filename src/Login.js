import React from "react";
import { connect } from "react-redux";
import { signinRequest, signinReset, signupRequest, signupReset } from "./redux/ui/actions.js";
import { Button, Input } from "antd";
import { bindActionCreators } from "redux";

class Login extends React.Component {
  //neden props var?
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      phone: "",
      phoneError: "",
      password: "",
      passwordError: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, phone, email, password } = this.state;
    this.props.currentJob === "Signup"
      ? this.props.signupRequest(name, phone, email, password)
      : this.props.signinRequest(email, password);
  };

  render() {
    return (
      <div>
        <form>
          {this.props.currentJob === "Signup" ? (
            <div>
              Name:{" "}
              <input
                style={{ height: 35, width: "70%", paddingLeft: 10, borderRadius: 5, borderWidth: 0 }}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="name and surname"
              />
              <Input value="sdasdasda" style={{ maxWidth: 350 }} />
              <Button className="mr-2" type="danger">
                asdasdasdasds
              </Button>
              <br />
              <br />
              Phone:{" "}
              <input
                style={{ height: 35, width: "70%", paddingLeft: 10, borderRadius: 5, borderWidth: 0 }}
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                placeholder="5** *** ** **"
              />
              <br />
              <br />
            </div>
          ) : null}
          E-mail:{" "}
          <input
            style={{ height: 35, width: "70%", paddingLeft: 10, borderRadius: 5, borderWidth: 0 }}
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="example@example.com"
          />
          <br />
          <br />
          Password:{" "}
          <input
            style={{ height: 35, width: "66%", paddingLeft: 10, borderRadius: 5, borderWidth: 0 }}
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="type your password"
          />
          <br />
          <br />
          <button
            onClick={this.handleSubmit}
            style={{
              width: 100,
              height: 30,
              borderRadius: 5,
              backgroundColor: "#5bc0de",
              marginRight: 10,
              borderWidth: 0
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(appState, ownProps) {
  return {
    ui: appState.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        signinRequest,
        signinReset,
        signupRequest,
        signupReset
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
