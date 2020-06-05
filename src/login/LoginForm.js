import React from "react";
import { Typography } from "@material-ui/core";
import firebase from '../Config';
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  LOL(){
    var Kpass = ''
    var Mpass = ''
    const db = firebase.database()
    const Kref = db.ref().child('UserInfo').child('KitchenCode')
    const Mref = db.ref().child('UserInfo').child('ManagerCode')
    Kref.on('value',snap=>{
      Kpass = snap.val()
    if(this.state.password==Kpass){
      

    }
  })

    Mref.on('value',snap=>{
        Mpass = snap.val()
        if(this.state.password==Mpass){
          
        }
      })
        
        
  }

  render() {

    const {password } = this.state;
    return (
      <form>
        <Typography>Password</Typography>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={this.handleChange}
        />
        <button type="submit">Login</button>
      </form>
     
    );
    
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log("Submitting");
    console.log(this.state);
  };
}
