import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import API from '../components/api'

class Create extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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

    axios.post(API+'/api/auth/register', { email, password,type })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div class="login">
      <h1>Register</h1>
      <form onSubmit={this.onSubmit}>
        <input type="text" name="email" placeholder="email" value={email} onChange={this.onChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange} required="required" />
        <div class="select">
            <select onChange={this.handleDropdownChange}>
              <option value="">Account Type</option>
              <option value="PM">Project Team</option>
              <option value="TST">Tester</option>
            </select>
          </div>
        <button type="submit" class="btn btn-primary btn-block btn-large">Sign up</button>
        <p>
            Already a member? <Link to="/login"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Login here</Link>
        </p>
    </form>
    </div>
    );
  }
}

export default Create;