import React from "react";
import { Typography, Container, OutlinedInput, Button, IconButton, InputAdornment } from "@material-ui/core";
import firebase from '../Config';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Redirect } from "react-router-dom";



export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: false,
      manager: false,
      kitchen: false,
      showPassword: false
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
            manager: true
          })
        } else { this.setState({ error: true }) }
      })
    })
  }

  


  handleChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleClickShowPassword = event => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSubmit = event => {
    this.LOL()
    console.log("Submitting");
  };

  render() {
    if (this.state.kitchen) {
      return (
        <Redirect push to='/kitchen/orders' />
      )
    }
    if (this.state.manager) {
      return (
        <Redirect push to='/manager' />
      )
    }
    return (

      <Container maxWidth='ms'>
        <div style={{ margin: (50), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar style={{ marginBottom: (10) }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color='primary' variant='h3'>Password</Typography>
          <form style={{ width: (300), marginTop: (1), alignItems: 'center' }} noValidate>
            <OutlinedInput
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              style={{ marginTop: (10) }}
              required
              type={this.state.showPassword ? 'text' : 'password'}
              error={this.state.error}
              margin='normal'
              variant='outlined'
              fullWidth
              placeholder="Enter your password"
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button color='primary' fullWidth variant='contained' style={{ marginTop: (10) }} onClick={this.handleSubmit}>Login</Button>
          </form>
        </div >
      </Container >
      
    );

  }
}


