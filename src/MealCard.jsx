import React, { useContext, useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
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


function writeUserData(MealName, MealPrice, MealId, timestamp, tableNumber) {
  var d = new Date();
  timestamp = d.getTime();
  console.log(tableNumber);
  firebase.database().ref('Orders/'+ tableNumber + '/Meals/' + timestamp).set({
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
  }, []); 

  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [orderList, setOrderList] = useState(null);

  const [cart, setCart] = useContext(CartContext);
  const [x, setx] = useState('');

  const addToCart = () => {
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, timestamp:0, table: props.table};
    setOrderList(meal);
    setCart(currentState => [...currentState, meal]);
    console.log(meal.table);
    setx(meal.table);
    writeUserData(meal.name, meal.price, meal.id, meal.timestamp, url);
 
    setShowAddAlert(true);
    
  }

  arrayOfOrder.push(orderList);

  const[mealsMeanu, setMealsMeanu] = useState(mealList);
 
    useEffect(() => {   
      firebase.database().ref('Orders/'+url+'/Meals').on('value',(snap)=>{
        setMealsMeanu(Object.values(snap.val()));
        
    })}, url)

  const deleteToCart = () => {
   
    const meal = { name: props.MealName, price: props.MealPrice, id: props.MealId, time: props.TimeStamp, table: props.table };
    console.log(mealsMeanu);
    console.log(meal.table);
    for(var k = 0; k<mealsMeanu.length; k++){
      if(mealsMeanu[k].MealName === meal.name){
        let deletedRef = firebase.database().ref('Orders/'+meal.table+'/Meals/' + mealsMeanu[k].TimeStamp);
          deletedRef.remove();
          setShowDeleteAlert(true);
          break;
     }
    }
  }

  const classes = useStyles();
  const { MealAvailability, MealDesc, MealId, MealImage, MealName, MealPrice, MealType , buttons} = props;
  
  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={"$" + MealPrice }
        />
        { showAddAlert === true ?         
        <Alert severity="success" onClose={() => {setShowAddAlert(false)}}>Meal Added to Orders</Alert>: "" }
        { showDeleteAlert === true ?         
        <Alert severity="error" onClose={() => {setShowDeleteAlert(false)}}>Meal Deleted from Orders</Alert>: "" }
        <CardMedia style={{ height: "170px" }} image={MealImage} />
        <CardContent>
          <Typography variant="body2" component="p">
            {MealDesc}
          </Typography>
        </CardContent>
        <CardActions>
        <Button id="hello"  color="primary" size="small" onClick={addToCart}>ADD</Button>
       <Button id="delete" size="small" onClick={deleteToCart}>DELETE</Button> 
        {/* {buttons.map(button => <Button size="small">{button.title}</Button>)}  */}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;