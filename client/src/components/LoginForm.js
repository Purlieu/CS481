import React, {Component} from 'react'
import {Jumbotron} from 'reactstrap';

import RealLogin from './RealLogin'
import Register from './Register'

export default class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        register: false
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    getDisplay = () => {
        const errors = this.props.errors || {};
        return this.state.register ?
            <Register errors={errors} inputchange={this.handleInputChange} cancelRegister={this.cancelRegister}
                      submit={this.onRegister}/> :
            <RealLogin errors={errors} inputchange={this.handleInputChange} register={this.onWantRegister}
                       submit={this.onSubmit}/>

    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password)
    };

    onWantRegister = (event) => {
        event.preventDefault();
        this.setState({register: true})
    };

    onRegister = (event) => {
        event.preventDefault();
        this.setState({register: false});
        this.props.onRegister(this.state.username, this.state.password);
    };

    cancelRegister = (event) => {
        event.preventDefault();
        this.setState({register: false})
    };

    render() {
        return (
            <Jumbotron className="container">
                {this.getDisplay()}
            </Jumbotron>
        )
    }
}
