import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      nama: localStorage.getItem("nama"),
      loggedIn: false
    }
  }

 

  render() {
     if(this.state.loggedIn === false){
      return <Redirect to="/login" />
    }
    return (
      <div className="animated fadeIn">

      </div>
    );
  }
}

export default Dashboard;
