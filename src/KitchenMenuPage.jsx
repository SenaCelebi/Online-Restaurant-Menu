import React, {useState, useEffect} from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mealList, soapList, dessertList } from "./constants";
import KitchenMenuItem from './KitchenMenuItem';
import firebase from "./Config";

import { CartProvider } from './CartContext';

import CollapsibleForKitchenMenu from "./CollabsibleForKithchenMenu"
import { Link } from "react-router-dom";

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
    root: {
      minWidth: 275,
    }
  });

  const styles = (theme) => ({
    card: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
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
        <Card
          className={styles.card}
          style={{ backgroundColor: "#f4f4f4" }}
          raised
        >
          <CardMedia
            component="img"
            alt="Table 5"
            height="200"
            image="https://www.barazzi.com/img/c/10.jpg"
            title="Table 5"
          />
          <CardContent>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <CollapsibleForKitchenMenu
                  list={soapsMenu}
                  title={"Soaps"}
                  subtitle={"Select a soap"}
                />
              </Grid>
              <Grid item>
                <CollapsibleForKitchenMenu
                  list={mealsMeanu}
                  title={"Meals"}
                  subtitle={"Select a meal"}
                />
              </Grid>
              <Grid item>
                <CollapsibleForKitchenMenu
                  list={dessertsMenu}
                  title={"Desserts"}
                  subtitle={"Select a dessert"}
                />
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </div>
  );
};

export default KitchenMenuPage;