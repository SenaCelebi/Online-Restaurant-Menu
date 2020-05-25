import React, { useContext, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { dessertList, soapList, mealList } from "./constants";

import firebase from "./Config";

import { CartContext } from './CartContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold'
  },
}));


function makeAvailableFirebase(MealId) {
  firebase.database().ref('Menu/').child(MealId).set({
    MealAvailability: "no"
  });
}


const arrayOfOrder = [];
const arrayOfTimestamp = [];
const MealCard = (props) => {

  const [orderList, setOrderList] = useState(null);

  const [cart, setCart] = useContext(CartContext);

  const makeAvailable = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, timestamp:0 };
    setOrderList(meal);
    makeAvailableFirebase(meal.id)
    setCart(currentState => [...currentState, meal]);
    console.log(meal);
    
  }

  arrayOfOrder.push(orderList);
  console.log(orderList);
  console.log(arrayOfOrder);
  

  const[mealsMeanu, setMealsMeanu] = useState(mealList);
 
    useEffect(() => {   
      firebase.database().ref('Orders/Table4/Meals').on('value',(snap)=>{
        setMealsMeanu(Object.values(snap.val()));
        console.log(mealsMeanu);
    })}, [])

  const deleteToCart = () => {
    console.log(mealsMeanu);
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, time: props.TimeStamp };
    for(var k = 0; k<mealsMeanu.length; k++){
      if(mealsMeanu[k].MealName == meal.name){
        let deletedRef = firebase.database().ref('Orders/Table4/Meals/' + mealsMeanu[k].TimeStamp);
          deletedRef.remove();
          break;
     }
    }
    console.log(arrayOfOrder);
  }

  const classes = useStyles();
  const { MealAvailability, MealDesc, MealId, MealImage, MealName, MealPrice , buttons} = props;

  
  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={"Is Available:  " + MealAvailability}
        />
        <CardActions>
        <Button id="hello"  color="primary" size="small" onClick={makeAvailable} >Available</Button>
        <Button id="delete" color="primary" size="small" onClick={deleteToCart}>Not</Button>
        {/* {buttons.map(button => <Button size="small">{button.title}</Button>)}  */}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;