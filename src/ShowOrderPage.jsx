import React, {useState, useEffect} from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { dessertList, soapList, mealList } from "./constants";
import Collapsible from "./Collapsible";
import firebase from "./Config";

  /*var firebaseheading = firebase.database().ref().child("heading");
  firebaseheading.on('value', function(datasnapshot){
    var xx = datasnapshot;
    console.log(tit);
  });*/

  const ShowOrderPage = () => {

  const styles = (theme) => ({
    card: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
    },
  });

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    }
  });

  const classes = useStyles();

    //Retrieving Meals

    const[mealsMeanu, setMealsMeanu] = useState(mealList);

    useEffect(() => {   
      firebase.database().ref('Orders/Table4/Meals').on('value',(snap)=>{
      setMealsMeanu(Object.values(snap.val()));
      console.log(mealsMeanu);
    })}, [])

    var updatedMenu = [];
    for(var i=0; i<mealsMeanu.length; i++){
      if(mealsMeanu[i].MealPrice != 0){
        updatedMenu.push(mealsMeanu[i]);
      }
    } 

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
          <CardHeader
            title={"Orders For Table5"}
            subheader={"Look at your orders. If you want to add or delete meals from your orders you can turn bact to Menu."}
          ></CardHeader>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              
            </Grid>
            <Grid item>
              <Card className={classes.root}>
              <CardHeader title={"Orders"}/>
                <CardContent>
                  <Typography variant="body2" component="p">
                   {updatedMenu.map(updatedMenu => <div>{updatedMenu.MealName + ":            $" + updatedMenu.MealPrice}</div>)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="Big" >ORDER</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowOrderPage;
