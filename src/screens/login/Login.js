import React, { Component } from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {FormHelperText} from "@material-ui/core";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const user_Name = "harsh";
const pass = "kumar";
const access_token = '';

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Login extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            validCred:"dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        if(this.state.username !== "" && this.state.loginPassword !== ""){
            this.state.validCred === (this.state.username.toString()=== user_Name && this.state.loginPassword.toString() === pass)
                ? this.setState({ validCred: "dispNone" }) : this.setState({ validCred: "dispBlock" });
        }


        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                    sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                    that.setState({
                        loggedIn: true
                    });

                }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);

    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }


    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="login-app-header">
                    <div className="app-logo-text"><span>Image Viewer</span></div>
                </header>
                {!this.state.loggedIn ?

                        <Card className="login-card">
                            <CardContent>
                                <FormControl >
                                    <Typography style={customStyles} color="textSecondary">
                                        LOGIN
                                    </Typography>
                                </FormControl>

                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                    <FormHelperText className={this.state.usernameRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>

                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                    <FormHelperText className={this.state.validCred}>
                                        <span className="red">Incorrect username and/or password</span>
                                    </FormHelperText>
                                </FormControl>

                                <br /><br />
                                {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                                }
                                <br></br>
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>

                            </CardContent>
                        </Card>

                    :
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.logoutHandler}>
                            Logout
                        </Button>
                    </div>
                }
            </div>
        )
    }
}

export default Login;