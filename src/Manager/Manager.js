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
      <Grid   container   direction="row"   justify="flex-end"   alignItems="center" > 
      <Button color="primary" style={{marginRight:"10px", marginTop:"2px"}} variant="contained" component={Link} to={'/kitchen/orders'}>KITCHEN ORDERS</Button> 
      <Button color="primary" style={{marginTop:"2px"}} variant="contained" component={Link} to={'/kitchen/menu'}>KITCHEN MENU</Button> </Grid>
    </React.StrictMode>
  )

}