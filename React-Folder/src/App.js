import React, { Component } from 'react';
import axios from 'axios';
import API from './components/api'

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    var type = localStorage.getItem('type');
    console.log(type)
    axios.get(API+'/api/auth/token')
      .then(res => {
        console.log(res.data)
        if(res.data.token === "Object]"){
          this.props.history.push("/login");
        }else{
          if(type === "PM")
          this.props.history.push("/PM");
          else
          this.props.history.push("/TST");
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default App;
