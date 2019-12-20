import React, { Component } from 'react';
import axios from 'axios';
import API from '../components/api'
import './login.css';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        repository: '',
        team: '',
      };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    
      onSubmit = (e) => {
        e.preventDefault();
    
        const { name, description,repository,team } = this.state;
    
        axios.post(API+'/api/auth/addProject', {name, description,repository,team }
        ).then(res =>{
          this.props.history.push("/");
        })
      }
    
      render() {
        const { name, description,repository,team} = this.state;
        return (
          <div class="login">
          <h1>Add Project</h1>
          <form onSubmit={this.onSubmit}>
              <input type="text"  placeholder="name" name="name" value={name} onChange={this.onChange} required/>
              <input type="text"  placeholder="description" name="description" value={description} onChange={this.onChange} required/>
              <input type="text"  placeholder="repository" name="repository" value={repository} onChange={this.onChange} required/>
              <input type="text"  placeholder="team" name="team" value={team} onChange={this.onChange} required/> 
            <button type="submit" class="btn btn-primary btn-block btn-large">Add</button>
        </form>
          </div>
        );
      }
    }
    
    export default App;
    