import React, { useContext, useState, useEffect } from "react";
import { Grid, Button, Paper, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpansionPanel, Divider } from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { CartContext } from './CartContext';
import { CartProvider } from './CartContext';

const KitchenMenuItem = ({ list, title, subtitle }, props) => {

  const [cart, setCart] = useContext(CartContext);
  console.log(props);

  const addToCart = () => {
    const meal = { name: props.MealName };
    //setOrderList(meal);
   // writeUserData(meal.name, meal.price, meal.id);
    setCart(currentState => [...currentState, meal]);
    console.log(meal);
    
  }

  
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    column: {
      flexBasis: "33.33%",
    },
    heading: {
      fontSize: 17,
      fontWeight: "bold",
    },
    paperStyles: {
      fontSize: 17,
      fontFamily: "Arial",
      padding: 15,
    },
  });

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {subtitle}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
        <CartProvider>
          <Grid container spacing={2}>
            {list.map((item) => (
              <Grid item xs={12}>
                <Paper className={classes.paperStyles}>
                  <Grid container>
                  <Grid item xs={1}>
                  <Avatar alt="Cindy Baker" src={item.MealImage} />
                  </Grid>
                    <Grid item xs={8}>
                      {item.MealName}
                    </Grid>
                    <Grid item xs={3}>
                      <Button size="small" onClick={addToCart} >Available</Button>
                      <Button size="small" color="secondary">Not</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CartProvider>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};

export default KitchenMenuItem;