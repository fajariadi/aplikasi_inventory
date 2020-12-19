import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
      
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
