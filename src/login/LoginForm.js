import React from "react";
import { Typography, Container, TextField, Button } from "@material-ui/core";
import firebase from '../Config';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from "react-router-dom";



export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: false,
      manager: false,
      kitchen: false
    };
  }


  LOL() {
    const db = firebase.database()
    const Kref = db.ref().child('UserInfo').child('KitchenCode')
    const Mref = db.ref().child('UserInfo').child('ManagerCode')
    Kref.on('value', snap => {
      const Kpass = snap.val()
      Mref.on('value', snap => {
        const Mpass = snap.val()
        if (this.state.password == Kpass) {
          this.setState({
            error: false,
            kitchen: true
          })
        } else if (this.state.password == Mpass) {
          this.setState({
            error: false,
            manger: true
          })
        }else {this.setState({ error: true }) }
    })
  })
}

handleChange = event => {
  this.setState({
    password: event.target.value
  });
};

handleSubmit = event => {
  this.LOL()
  console.log("Submitting");
};

render() {
  if (this.state.manger) {
    return <Redirect push to='/manager' />
  }
  if (this.state.kitchen) {
    return <Redirect push to='/kitchen/orders' />
  }
  return (

    <Container maxWidth='ms'>
      <div style={{ margin: (50), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar style={{ margin: (10) }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color='primary' variant='h3'>Password</Typography>
        <form style={{ width: (300), marginTop: (1), alignItems: 'center' }} noValidate>
          <TextField
            required
            error={this.state.error}
            margin='normal'
            variant='outlined'
            fullWidth
            type="password"
            placeholder="Enter your password"
            onChange={this.handleChange}
          />
          <Button color='primary' fullWidth variant='contained' style={{ marginTop: (5) }} onClick={this.handleSubmit}>Login</Button>
        </form>
      </div >
    </Container >
  );

}
}
