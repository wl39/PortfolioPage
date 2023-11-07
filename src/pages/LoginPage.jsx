import React from "react";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { AccountCircle, Lock } from "@mui/icons-material";
import styles from "./LoginPage.module.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      id: "",
      password: "",
    };
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  idHandler = (event) => {
    console.log(this.state.id);
    this.setState({
      id: event.target.value,
    });
  };

  passwordHandler = (event) => {
    console.log(this.state.id);
    this.setState({
      password: event.target.value,
    });
  };

  submit = () => {
    console.log(this.state.id + " " + this.state.password);
  };

  render() {
    return (
      <div>
        <div className={styles.inputContainer}>
          <input onChange={this.idHandler} />
          <input type="password" onChange={this.passwordHandler} />
        </div>
        <button onClick={this.submit}>SUBMIT</button>
      </div>
    );
  }
}

export default LoginPage;
