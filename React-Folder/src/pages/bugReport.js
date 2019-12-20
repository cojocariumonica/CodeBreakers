import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import API from '../components/api'
import './table.scss';

class bugReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
      redirect: false
    };
  }

  componentDidMount() {
      console.log(this.props.location.state.project_id)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get(API+'/api/auth/token')
      .then(res => {
        console.log(res.data)
        if(res.data.token === "Object]"){
          this.props.history.push("/login");
        }else{
          axios.get(API+'/api/auth/getBugs/'+this.props.location.state.project_id)
          .then(response => {
            this.setState({bugs:response.data.tableData})
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

  DeleteThis = value => {

    axios.delete("/api/Music/deletesongs/" + value
        ).then(res =>{
          window.location.reload();
        })
  }

  UpdateThis = (id,bug,sev,des,link,all,stat,prid) => {

        this.props.history.push({
          pathname: '/updateBug',
          state: {id: id,bug:bug,sev:sev,des:des,link:link,all:all,stat:stat,prid:prid}  
      });

  }

  bugReport = (id) => {
    console.log("here")
    this.props.history.push({pathname: '/bugReport',state: {project_id: id} });
  }

  render() {
    return (
      <div>
      <div class="table-users">
      <div class="header">Software Projects</div>
      <table cellspacing="0">
          <tr>
          <th>Bug</th>
          <th>Severity</th>
          <th>Description</th>
          <th>Link</th>
          <th>Allocate</th>
          <th>Status</th>
          <th>Update</th>
          </tr>
          {this.state.bugs.map(bug =>
                  <tr>
                    <td>{bug.bug}</td>
                    <td>{bug.severity}</td>
                    <td>{bug.description}</td>
                    <td><a href={bug.link}>{bug.link}</a></td>
                    <td>{bug.allocate}</td>
                    <td>{bug.status}</td>
                    <td>
                     <button class="btn btn-primary btn-block btn-large" onClick={() => this.UpdateThis(bug.id,
                                                                                                        bug.bug,
                                                                                                        bug.severity,
                                                                                                        bug.description,
                                                                                                        bug.link,
                                                                                                        bug.allocate,
                                                                                                        bug.status,
                                                                                                        bug.project_id)}>Update</button>
                    </td>
                  </tr>
                )}
            </table>
        </div>
      </div>
    );
  }
}

export default bugReport;
