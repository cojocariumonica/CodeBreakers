import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './pages/login';
import Register from './pages/register';
import Addproject from './pages/addProject';
import AddBug from './pages/addBug';
import PM from './pages/PM';
import TST from './pages/TST';
import BugReport from './pages/bugReport';
import updateBug from './pages/updateBug';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/addproject' component={Addproject} />
      <Route path='/addbug' component={AddBug} />
      <Route path='/PM' component={PM} />
      <Route path='/TST' component={TST} />
      <Route path='/bugReport' component={BugReport}/>
      <Route path='/updateBug' component={updateBug}/>
    </div>
</Router>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
