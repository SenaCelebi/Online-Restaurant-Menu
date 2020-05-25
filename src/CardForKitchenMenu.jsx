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


function makeAvailableFirebase(MealName, MealType, MealId, MealDesc, MealImage, MealPrice) {
  firebase.database().ref('Menu/' + MealType).child(MealId).set({
    MealDesc: MealDesc,
    MealImage: MealImage,
    MealName: MealName,
    MealId: MealId,
    MealAvailability: "Available",
    MealType: MealType,
    MealPrice: MealPrice
  });
}

function makeNotAvailableFirebase(MealName, MealType, MealId, MealDesc, MealImage, MealPrice) {
  firebase.database().ref('Menu/' + MealType).child(MealId).set({
    MealDesc: MealDesc,
    MealImage: MealImage,
    MealName: MealName,
    MealId: MealId,
    MealAvailability: "Not Available",
    MealType: MealType,
    MealPrice: MealPrice
  });
}


const arrayOfOrder = [];
const arrayOfTimestamp = [];
const MealCard = (props) => {

  const [orderList, setOrderList] = useState(null);

  const [cart, setCart] = useContext(CartContext);

  const makeAvailable = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, type: props.MealType , desc: props.MealDesc, image: props.MealImage };
    setOrderList(meal);
    makeAvailableFirebase(meal.name, meal.type, meal.id, meal.desc, meal.image, meal.price)
    setCart(currentState => [...currentState, meal]);
    console.log(meal);
    
  }

  const makeNotAvailable = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, type: props.MealType , desc: props.MealDesc, image: props.MealImage };
    setOrderList(meal);
    makeNotAvailableFirebase(meal.name, meal.type, meal.id, meal.desc, meal.image, meal.price)
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


  const classes = useStyles();
  const { MealAvailability, MealDesc, MealId, MealImage, MealName, MealPrice , MealType, buttons } = props;

  
  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={MealAvailability}
        />
        <CardActions>
        <Button id="hello"  color="primary" size="small" onClick={makeAvailable} >Available</Button>
        <Button id="delete" color="primary" size="small" onClick={makeNotAvailable}>Not</Button>
        {/* {buttons.map(button => <Button size="small">{button.title}</Button>)}  */}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;