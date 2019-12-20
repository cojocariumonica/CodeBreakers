import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import API from '../components/api';
import './table.scss';

class PM extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      redirect: false
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get(API+'/api/auth/token')
      .then(res => {
        console.log(res.data)
        if(res.data.token === "Object]"){
          this.props.history.push("/login");
        }else{
          axios.get(API+'/api/auth/getProjects')
          .then(response => {
            console.log(response.data.tableData)
            this.setState({projects:response.data.tableData})
          })
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  addRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/addproject' />
    }
  }

  bugReport = (id) => {
    console.log("here")
    this.props.history.push({pathname: '/bugReport',state: {project_id: id} });
  }

  render() {
    return (
      <div>
      <div class="table-users">
      {localStorage.getItem('jwtToken') &&
        <button class="btn btn-primary" onClick={this.logout}>Logout</button>
      }
      <div class="header">Software Projects</div>
      <table cellspacing="0">
          <tr>
          <th>Project Name</th>
          <th>Description</th>
          <th>Repository</th>
          <th>Project Team</th>
          <th>See Bug Report</th>
          </tr>

      {this.state.projects.map(project =>
                  <tr>
                    <td>{project.project_name}</td>
                    <td>{project.description}</td>
                    <td><a href={project.repository}>{project.repository}</a></td>
                    <td>{project.project_team}</td>
                    <td>
                     <button class="btn btn-primary btn-block btn-large" onClick={() => this.bugReport(project.id)}>Bug Report</button>
                    </td>
                  </tr>
                )}
   </table>
   <div>
                {this.addRedirect()}
                <button class="btn btn-primary" onClick={this.setRedirect}>Add Project</button>
                 </div>
    </div>
      </div>
    );
  }
}

export default PM;
