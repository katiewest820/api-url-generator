import React from 'react';
import './App.css';
import Main from './components/main/main';
import DragTo from './components/dragTo/dragTo';
import DragFrom from './components/dragFrom/dragFrom';

export default class App extends React.Component {
  
  render() {
    return (
      <div>
        <Main/>
        <DragFrom/>
        <DragTo/>
      </div>
    );
  }
}

