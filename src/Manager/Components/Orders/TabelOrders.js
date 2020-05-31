import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Toolbar, Button, IconButton, CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid, Card, CardContent } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import firebase from '../../../Config';
import OrdersDialog from './OrdersDialog';


const styles = theme => ({
  root: {
    width: '100%',
  },
  status: {
    flex: 1,
    variant: 'title',
    color: theme.palette.text.secondary,
  },
  paper: {
    textAlign: 'center',
    variant: 'outlined',
    width: 'auto'
  },
  extra: {
    flexGrow: 1
  },
  Button: {
    margin: theme.spacing(1)
  }

});

class xTables extends Component {
  constructor() {
    super()
    this.state = {
      titles: [],
      meals: [],
      MealInfo: [],
      open: true,
    }

  }

  componentDidMount() {
    const db = firebase.database();
    const OrderRef = db.ref().child('Orders');

    OrderRef.on('value', snap => {
      var arr = [] //Will contain Table Name, Status Of Orders for mapping
      snap.forEach(childSnapshot => {      //Snap The Tables
        if (childSnapshot.key != null) {
          const x = { name: '', status: '', total: 0 } //An Object to Hold the two values
          x.name = childSnapshot.key

          OrderRef.child(childSnapshot.key).child('StatusOfOrder').on('value', snap => {
            x.status = snap.val()
          })

          OrderRef.child(childSnapshot.key).child('Meals').on('value', snap => {
            var total = 0
            snap.forEach(childSnapshot => {
              total += childSnapshot.val().MealPrice
            })
            x.total = total
          })

          OrderRef.child(childSnapshot.key).child('TotalPrice').update({ TotalPrice: x.total })

          arr.push(x)
          this.setState({
            titles: arr,
          })
        }
      })
      arr = []
    });
  }


  DeleteItem(table, timestamp) {
    const onClick = () =>{
      const db = firebase.database();
      db.ref().child('Orders').child(table).child('Meals').child(timestamp).remove();
    }
    return (
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={onClick}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    )
  }

  DeleteTable(table) {
    const onClick = () =>{
      const db = firebase.database();
      db.ref().child('Orders').child(table).remove();
    }
    return (
      <IconButton
        size="small"
        variant="contained"
        color="secondary"
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>

    )
  }

  Inside(TableName) {
    const db = firebase.database();
    const TableRef = db.ref().child('Orders').child(TableName).child('Meals');
    var temp = []
    TableRef.on('value', snap => {

      if (snap.val() != null) {
        temp = Object.values(snap.val())
      }
      
    })

    const { classes } = this.props;
    return (
      <Fragment className={classes.extra}>
        <Grid container direction="row" spacing={1}>
          {temp.map((i, index) => {
            if (i != null && i.MealPrice != 0) {
              return (
                <Grid item>
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography color="textSecondary" align="left" gutterBottom>
                        Order #{index}
                      </Typography>
                      <Typography variant="h5" component="h2" align="left">
                        {i.MealName}
                      </Typography>
                      <Typography color="textSecondary" align="right">
                        {i.MealPrice}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    {this.DeleteItem(TableName, i.TimeStamp)}
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
          }
          )}
        </Grid>
      </Fragment>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Toolbar>
          <Typography align="left" style={{ flex: 1 }}>
            Tables
            </Typography>
          <OrdersDialog />
        </Toolbar>
        {this.state.titles.map((item, index) => {
          if (item.name != null) {
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.name}</Typography>
                  <Typography className={classes.status}> {item.status}</Typography>
                  <Typography className={classes.status}> {item.total}</Typography>
                  {this.DeleteTable(item.name)}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.Inside(item.name)}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          }
        }
        )}
      </div>
    );
  }

}




export default withStyles(styles)(xTables);
