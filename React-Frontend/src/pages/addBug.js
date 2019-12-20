import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import API from '../components/api'
import './login.css';

class addBug extends Component {

    constructor(props) {
      super(props);
      this.state = {
        bug: '',
        severity: '',
        description: '',
        link: '',
      };
    }

    componentDidMount() {
        console.log(this.props.location.state.project_id)
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
      onSubmit = (e) => {
        e.preventDefault();
    
        const { bug, severity,description,link } = this.state;
        var allocate = "Not allocated"; 
        var status = "None"
        var project_id = this.props.location.state.project_id
    
        axios.post(API+'/api/auth/addBug', {bug, severity,description,link,allocate,status,project_id:project_id }
        ).then(res =>{
          this.props.history.push("/");
        })
      }
    
      render() {
        const { bug, severity,description,link} = this.state;
        return (
          <div class="login">
          <h1>Add Bug</h1>
          <form onSubmit={this.onSubmit}>
              <input type="text"  placeholder="bug" name="bug" value={bug} onChange={this.onChange} required/>
              <input type="text"  placeholder="severity" name="severity" value={severity} onChange={this.onChange} required/>
              <input type="text"  placeholder="description" name="description" value={description} onChange={this.onChange} required/>
              <input type="text"  placeholder="link" name="link" value={link} onChange={this.onChange} required/>
            <button type="submit" class="btn btn-primary btn-block btn-large">Add</button>
        </form>
        </div>
        );
      }
    }
    
    export default addBug;
    