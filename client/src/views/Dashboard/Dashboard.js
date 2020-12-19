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
    }; // eslint-disable-next-line
    const username= localStorage.getItem("username")

    let loggedIn = false 
      
    this.state = {
      nama: localStorage.getItem("nama"),
      loggedIn
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
