import React from 'react';
import './App.css';
import Main from './components/main/main';
import ReportBuild from './components/reportBuild/reportBuild';
import {Switch, Route} from 'react-router-dom';

export default class App extends React.Component {
  
  render() {
    return (
    	<div>
      		<Switch>
        		<Route exact path="/" component={Main}/>
        		<Route exact path="/report" component={ReportBuild}/>
        	</Switch>
      	</div>
    );
  }
}

