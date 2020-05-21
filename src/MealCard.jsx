import React, { useContext, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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


function writeUserData(MealName, MealPrice, MealId, MealCount) {
  firebase.database().ref('Orders/Table4/Meals/' + MealId).set({
    MealName: MealName,
    MealPrice: MealPrice,
    MealCount: MealCount
  });
}


const arrayOfOrder = [];
const MealCard = (props) => {

  const [orderList, setOrderList] = useState(null);

  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId };
    setOrderList(meal);
   // writeUserData(meal.name, meal.price, meal.id);
    setCart(currentState => [...currentState, meal]);
    console.log(meal);
    
  }

  arrayOfOrder.push(orderList);
  console.log(orderList);
  console.log(arrayOfOrder);
  

  for (var i = 0; i < arrayOfOrder.length; i++) {
    if(arrayOfOrder[i] != null){
      writeUserData(arrayOfOrder[i].name, arrayOfOrder[i].price, arrayOfOrder[i].id, 0);
    }
  }

  const deleteToCart = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId };
    for (var i = 0; i < arrayOfOrder.length; i++) {
      if (arrayOfOrder[i] != null) {
        if (arrayOfOrder[i].name == meal.name) {
          let deletedRef = firebase.database().ref('Orders/Table4/Meals/' + arrayOfOrder[i].id);
          deletedRef.remove();
          arrayOfOrder[i] = null;
          break;
        }
      }
    }
    console.log(arrayOfOrder);
    //setOrderList(meal);
    // writeUserData(meal.name, meal.price, meal.id);
    // setCart(currentState => [...currentState, meal]);
    //console.log(meal);
  }

  const classes = useStyles();
  const { MeaLAvailability, MealDesc, MealId, MealImage, MealName, MealPrice , buttons} = props;

 /* const but = document.getElementById('hello');
  if(but){
  but.addEventListener('click', (e) => {
    e.preventDefault();
    ref.set({
      MealName: props.MealName,
      MealPrice: MealPrice
    });
  });}*/
  
  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={"$" + MealPrice}
        />
        <CardMedia style={{ height: "170px" }} image={MealImage} />
        <CardContent>
          <Typography variant="body2" component="p">
            {MealDesc}
          </Typography>
        </CardContent>
        <CardActions>
        <Button id="hello" size="small" onClick={addToCart} >ADD</Button>
        <Button id="delete" size="small" onClick={deleteToCart}>DELETE</Button>
        {/* {buttons.map(button => <Button size="small">{button.title}</Button>)}  */}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;