import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import API from '../components/api'

class updateBug extends Component {

    constructor(props) {
      super(props);
      this.state = {
        bug: '',
        severity: '',
        description: '',
        link: '',
        allocate:'',
        status:'',
      };
    }

    componentDidMount() {
        console.log(this.props.location.state.id)
        console.log(this.props.location.state.bug)
        console.log(this.props.location.state.prid)
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
      onSubmit = (e) => {
        e.preventDefault();
    
        const { bug, severity,description,link,allocate,status} = this.state;
        var id = this.props.location.state.id
        var project_id = this.props.location.state.prid;
        axios.post(API+'/api/auth/updateBug', {id,bug, severity,description,link,allocate,status,project_id }
        ).then(res =>{
            console.log(res)
        })
      }
    
      render() {
        const { bug, severity,description,link,allocate,status} = this.state;
        return (
          <div class="login">
          <h1>Update Bug</h1>
          <form onSubmit={this.onSubmit}>
              <input type="text"  placeholder={this.props.location.state.bug} name="bug" value={bug} onChange={this.onChange} required/>
              <input type="text"  placeholder={this.props.location.state.sev} name="severity" value={severity} onChange={this.onChange} required/>
              <input type="text"  placeholder={this.props.location.state.des} name="description" value={description} onChange={this.onChange} required/>
              <input type="text"  placeholder={this.props.location.state.link} name="link" value={link} onChange={this.onChange} required/>
              <input type="text"  placeholder={this.props.location.state.all} name="allocate" value={allocate} onChange={this.onChange} required/>
              <input type="text"  placeholder={this.props.location.state.stat} name="status" value={status} onChange={this.onChange} required/>
            <button type="submit" class="btn btn-primary btn-block btn-large">Update</button>
        </form>
        </div>
        );
      }
    }
    
    export default updateBug;
    