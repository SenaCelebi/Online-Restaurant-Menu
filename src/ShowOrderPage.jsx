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
import Collapsible from "./Collapsible";
import firebase from "./Config";
import { dessertList, soapList, mealList } from "./constants";
import CollapsibleForShowOrder from "./CollapsibleForShowOrder"






  const ShowOrderPage = ({location}) => {

    console.log(location);

    const [url, setUrl] = useState('');

    useEffect(() =>{
      const params = new URLSearchParams(location.search);
      const q = params.get('q');
      console.log(q);
      setUrl(q);
      console.log(url);
    }, []);


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

    var totalPrice = 0;

    useEffect(() => {   
      firebase.database().ref('Orders/Table4/Meals').on('value',(snap)=>{
      setMealsMeanu(Object.values(snap.val()));
      
    })}, [])

    var updatedMenu = [];
    for(var i=0; i<mealsMeanu.length; i++){
      if(mealsMeanu[i].MealPrice !== 0){
        updatedMenu.push(mealsMeanu[i]);
      }
    } 

    for( i=0; i<updatedMenu.length; i++){
      totalPrice += updatedMenu[i].MealPrice;
    }

    const writeTotalPrice = (total) => {
      firebase.database().ref('Orders/Table4/TotalPrice').set({
        TotalPrice: total
      });
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
        {/*  <CardHeader
            title={"Orders For Table5"}
            subheader={"Look at your orders. If you want to add or delete meals from your orders you can turn bact to Menu."}
        ></CardHeader> */}
          <Grid container direction="column" spacing={4}>
            <Grid item>
              
            </Grid>
            <Grid item>
              <Card className={classes.root}>
            {/*  <CardHeader title={"Orders"}/> */}
                <CardContent>
                {/*  <Typography variant="body2" component="p">
                   {updatedMenu.map(updatedMenu => <div>{updatedMenu.MealName + ":            $" + updatedMenu.MealPrice}</div>)}
                 </Typography> */}
                  <Grid item>
                     <CollapsibleForShowOrder
                      list={updatedMenu}
                      title={"Order"}
                      subtitle={"Show Your Orders"}
                  />
            </Grid>
                </CardContent>
                <CardActions>
                  <Button size="Big" color="primary" onClick={() => writeTotalPrice(totalPrice)}>Total Price: ${totalPrice}</Button>
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