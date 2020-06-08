import React from 'react';
import Frame from './Components/Frame';
import Tabs from './Components/Tabs';
import {
  Grid,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";


export default function Manager() {
  return (
    <React.StrictMode>
      <Frame />
      <Tabs />
      <Grid item xs={3} md={8}><Button color="primary"  variant="contained" component={Link} to={'/kitchen/orders'}>KITCHEN ORDERS</Button></Grid>
      <Grid item xs={3} md={8}><Button color="primary"  variant="contained" component={Link} to={'/kitchen/menu'}>KITCHEN MENU</Button></Grid>
    </React.StrictMode>
  )

}