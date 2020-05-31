import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import firebase from "./Config";


const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    fontSize: '20px',
    fontWeight: 'bold'
  },
}));


const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={0} md={1}/>
          <Grid item xs={6} md={8}>
            <Grid container spacing={2}>
              <Grid item>
                <RestaurantIcon  />
              </Grid>
              <Grid item >
                <Typography className={classes.typographyStyles}>
                  Restaurant App
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} md={1}><Button color="inherit" component={Link} to={'/'}>ORDERS</Button></Grid>
          <Grid item xs={3} md={1}><Button color="inherit" component={Link} to={'/kitchen/orders'}>KITCHEN</Button></Grid>
          <Grid item xs={3} md={1}><Button color="inherit" component={Link} to={'/manager'}>Manager</Button></Grid>
          <Grid item xs={0} md={1}/>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
