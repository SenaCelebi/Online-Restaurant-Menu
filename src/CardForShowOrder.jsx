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


function writeUserData(MealName, MealPrice, MealId, timestamp) {
  var d = new Date();
  timestamp = d.getTime();
  
  firebase.database().ref('Orders/Table4/Meals/' + timestamp).set({
    MealName: MealName,
    MealPrice: MealPrice,
    TimeStamp: timestamp
  });
}



const arrayOfOrder = [];
const arrayOfTimestamp = [];
const MealCard = (props) => {

  const [url, setUrl] = useState('Table4');

  useEffect(() =>{
     setUrl(props.table);
     console.log(url);
  }, url); 

  const [orderList, setOrderList] = useState(null);

  const [cart, setCart] = useContext(CartContext);


  arrayOfOrder.push(orderList);
 

  const[mealsMeanu, setMealsMeanu] = useState(mealList);
 
    useEffect(() => {   
      firebase.database().ref('Orders/' + url +'/Meals').on('value',(snap)=>{
        setMealsMeanu(Object.values(snap.val()));
        
    })}, url)

  const deleteToCart = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, time: props.TimeStamp };
    console.log(url);
    for(var k = 0; k<mealsMeanu.length; k++){
      if(mealsMeanu[k].MealName == meal.name){
        let deletedRef = firebase.database().ref('Orders/'+ url + '/Meals/' + mealsMeanu[k].TimeStamp);
          deletedRef.remove();
          break;
     }
    }
 
  
  }

  const classes = useStyles();
  const { MeaLAvailability, MealDesc, MealId, MealImage, MealName, MealPrice , buttons} = props;

  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={"$" + MealPrice}
        />

        <CardActions>
        <Button id="delete" size="small" color="secondary" onClick={deleteToCart}>DELETE</Button>
        {/* {buttons.map(button => <Button size="small">{button.title}</Button>)}  */}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;