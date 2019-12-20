import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';
import API from '../components/api'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
      type: ''
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);

  }

  handleDropdownChange(e) {
    this.setState({ type: e.target.value });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password,type } = this.state;

    axios.post(API+'/api/auth/login', { email, password,type })
      .then((result) => {
        console.log(result.data.token)
        if(result.data.success === true){
          localStorage.setItem('jwtToken', result.data.token);
          localStorage.setItem('type', result.data.type);
          this.setState({ message: '' });
          if(result.data.type === "PM")
          this.props.history.push('/PM')
          else
          this.props.history.push('/TST')
        }else{
          this.setState({ message: 'Login failed. Username or password not match' });

        }
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div class="login">
      <h1>Login</h1>
      <form onSubmit={this.onSubmit}>
        {message !== '' &&
            <div class="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
        <input type="text" name="email" placeholder="email" value={email} onChange={this.onChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange} required="required" />
        <div class="select">
            <select onChange={this.handleDropdownChange}>
              <option value="">Account Type</option>
              <option value="PM">Project Team</option>
              <option value="TST">Tester</option>
            </select>
          </div>
        <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
        <p>
            Not a member? <Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
        </p>
    </form>
    </div>
    );
  }
}

export default Login;