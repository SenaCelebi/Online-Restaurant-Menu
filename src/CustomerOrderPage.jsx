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

  const CustomerOrderPage = () => {

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

  //Retrieving data from firebase

  const [tit, setTit] = useState(null);

  useEffect(() => {   
    firebase.database().ref('heading').on('value',(snap)=>{
    setTit(snap.val());
    console.log(tit);
    console.log(snap.val()); 
  })}, [])

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
            title={"" + tit}
            subheader={"Create your order for table 5"}
          ></CardHeader>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Collapsible
                list={soapsMenu}
                title={"Soaps"}
                subtitle={"Select a soap"}
              />
            </Grid>
            <Grid item>
              <Collapsible
                list={mealsMeanu}
                title={"Meals"}
                subtitle={"Select a meal"}
              />
            </Grid>
            <Grid item>
              <Collapsible
                list={dessertsMenu}
                title={"Desserts"}
                subtitle={"Select a dessert"}
              />
            </Grid>
            <Grid item>
              <Card className={classes.root}>
              <CardHeader title={"Orders"}/>
                <CardContent>
                  <Typography variant="body2" component="p">
                    ORDER 1
                    ORDER 2
                    ORDER 3
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="Big">ORDER</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrderPage;
