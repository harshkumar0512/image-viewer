import React, {Component} from 'react';
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
import {Redirect} from 'react-router-dom';

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
// Note: Please update this access_token in controller
//const access_token = "IGQVJWWHNOT181UWhxemp4cjd1dUM3ZAGlEZAjVMdnlDeXE1M3FVVzFPN3ExZA1dadDBkTF81WWZAfTUduX3FrdlVQS3h0ZAWhTZAHNUaWhqWVBVOVRFSmJBSlVRYlBGa2ltQUFLMm5DN3hFTUJYMzBGaHMxbzdoY1F6RW93V0Jn";

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
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
            validCred: "dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.loginPassword === "" ? this.setState({loginPasswordRequired: "dispBlock"}) : this.setState({loginPasswordRequired: "dispNone"});
        if (this.state.username !== "" && this.state.loginPassword !== "") {
            this.state.validCred === (this.state.username.toString() === user_Name.toString() && this.state.loginPassword.toString() === pass.toString())
                ? this.setState({validCred: "dispNone"}) : this.setState({validCred: "dispBlock"});
        }

        let that = this;

        if (this.state.username.toString() === user_Name.toString() && this.state.loginPassword.toString() === pass.toString()) {
            sessionStorage.setItem("access-token", this.props.accessToken);
            // change this storage process since getting repeated error
            that.setState({
                loggedIn: true
            });

        }

    }

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({loginPassword: e.target.value});
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
                {this.state.loggedIn === true ?
                    <Redirect to="/home"/>
                    :
                    <div>
                        <header className="login-app-header">
                            <div className="app-logo-text"><span>Image Viewer</span></div>
                        </header>

                        <div>
                            <Card className="login-card">
                                <CardContent>
                                    <FormControl>
                                        <Typography style={customStyles} color="textSecondary">
                                            LOGIN
                                        </Typography>
                                    </FormControl>

                                    <br/><br/>
                                    <FormControl required>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username" type="text" className="login-input"
                                               username={this.state.username}
                                               onChange={this.inputUsernameChangeHandler}/>
                                        <FormHelperText className={this.state.usernameRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>

                                    <br/><br/>
                                    <FormControl required>
                                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                        <Input id="loginPassword" type="password" className="login-input"
                                               loginpassword={this.state.loginPassword}
                                               onChange={this.inputLoginPasswordChangeHandler}/>
                                        <FormHelperText className={this.state.loginPasswordRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                        <FormHelperText className={this.state.validCred}>
                                            <span className="red">Incorrect username and/or password</span>
                                        </FormHelperText>
                                    </FormControl>

                                    <br/><br/>
                                    {this.state.loggedIn === true &&
                                    <FormControl>
                    <span className="successText">
                    Login Successful!
                    </span>
                                    </FormControl>
                                    }
                                    <br></br>
                                    <Button variant="contained" color="primary"
                                            onClick={this.loginClickHandler}>LOGIN</Button>

                                </CardContent>
                            </Card>
                        </div>
                    </div>


                }
            </div>
        )
    }
}

export default Login;