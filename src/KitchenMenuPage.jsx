import React, {useState, useEffect} from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mealList, soapList, dessertList } from "./constants";
import KitchenMenuItem from './KitchenMenuItem';
import firebase from "./Config";

import { CartProvider } from './CartContext';

const KitchenMenuPage = () => {
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
      fontWeight: "bold",
      padding: 15,
    },
  });

  const classes = useStyles();

    //Retrieving Soaps

    const[soapsMenu, setSoapMenu] = useState(soapList);

    useEffect(() => {   
      firebase.database().ref('Menu/Soaps').on('value',(snap)=>{
      setSoapMenu(Object.values(snap.val()));
      console.log(soapsMenu);
      console.log(snap.val()); 
      console.log(Object.values(snap.val()));
    })}, [])
  
      //Retrieving Dessertes
  
      const[dessertsMenu, setDessertsMenu] = useState(dessertList);
  
      useEffect(() => {   
        firebase.database().ref('Menu/Desserts').on('value',(snap)=>{
        setDessertsMenu(Object.values(snap.val()));
        console.log(dessertsMenu);
        console.log(snap.val()); 
        console.log(Object.values(snap.val()));
      })}, [])
  
      //Retrieving Meals
  
      const[mealsMeanu, setMealsMeanu] = useState(mealList);
  
      useEffect(() => {   
        firebase.database().ref('Menu/Meals').on('value',(snap)=>{
        setMealsMeanu(Object.values(snap.val()));
        console.log(mealsMeanu);
        console.log(snap.val()); 
        console.log(Object.values(snap.val()));
      })}, [])

      const MealsObject = Object.assign({}, ...mealsMeanu)
      console.log(MealsObject);
    
  return (
    <div>
      <CartProvider>
      <Card style={{ backgroundColor: "#ffffff" }} raised>
        <CardMedia
          component="img"
          alt="Table 5"
          height="200"
          image="https://ak5.picdn.net/shutterstock/videos/28204555/thumb/1.jpg"
          title="Table 5"
        />
        <CardHeader
          title={"Menu"}
          subheader={"Choose available menu items"}
        ></CardHeader>
        <CardContent>
          <Grid container direction="column" spacing={4}>
          <KitchenMenuItem list={soapsMenu} title={"Soaps"} subtitle={"Soaps in the Menu"} {...MealsObject}/>
          <KitchenMenuItem list={mealsMeanu} title={"Meals"} subtitle={"Meals in the Menu"} {...MealsObject} />
          <KitchenMenuItem list={dessertsMenu} title={"Desserts"} subtitle={"Desserts in the Menu"} {...MealsObject} />
          </Grid>
        </CardContent>
      </Card>
      </CartProvider>
    </div>
  );
};

export default KitchenMenuPage;