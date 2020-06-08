import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import Collapsible from "./Collapsible";
import firebase from "./Config";
import { dessertList, soapList, mealList } from "./constants";
import CollapsibleForShowOrder from "./CollapsibleForShowOrder"
import CustomizedSteppers from "./Checkout/Views/Stepper";
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeyGet } from './Checkout/constants/functions'
import { StateProvider } from './Checkout/StateContext';


const ShowOrderPage = ({ location }) => {
document.title="YOUR ORDERS";
  const [state, setstate] = useState(false)

  const [stripePromise, setStripePromise] = useState(null)


  const handleClick = () => {
    setstate(true)
  }

  useEffect(() => {
    const retrievePublishableKey = async () => {
      const publishableKey = await publishableKeyGet()
      const stripe = loadStripe(publishableKey);
      setStripePromise(stripe)
    }
    retrievePublishableKey()
  }, [])

  console.log(location);

  const [url, setUrl] = useState('Table4');

  useEffect(() => {
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
    },
    boxWrapper: {
      marginBottom: "55px",
      minHeight: "calc(26vh + 260px)"
    },
    container: {
      position: "relative",
      zIndex: "1100",
      marginTop: "-95px",
      marginBottom: "45px",
    },
    dialogPaper: {
      minHeight: '53vh',
      maxHeight: 'auto',
    },
  });

  const classes = useStyles();

  //Retrieving Meals

  const [mealsMeanu, setMealsMeanu] = useState(mealList);

  var totalPrice = 0;

  useEffect(() => {
    firebase.database().ref('Orders/' + url + '/Meals').on('value', (snap) => {
      setMealsMeanu(Object.values(snap.val()));

    })
  }, url)

  var updatedMenu = [];
  for (var i = 0; i < mealsMeanu.length; i++) {
    if (mealsMeanu[i].MealPrice !== 0) {
      updatedMenu.push(mealsMeanu[i]);
    }
  }

  for (i = 0; i < updatedMenu.length; i++) {
    totalPrice += updatedMenu[i].MealPrice;
  }

  const writeTotalPrice = (total) => {
    firebase.database().ref('Orders/' + url + '/TotalPrice').set({
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
                      table={url}
                      list={updatedMenu}
                      title={"Order"}
                      subtitle={"Show Your Orders"}
                    />
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button size="Big" color="primary" onClick={() => writeTotalPrice(totalPrice)}>Total Price: ${totalPrice}</Button>
                  <Grid container direction="row" justify="flex-end" alignItems="center" >
                    <Button onClick={handleClick} color="primary" style={{ marginRight: "10px", marginTop: "2px" }} variant="contained">CHECKOUT</Button>  
                    </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <StateProvider>
            <Dialog classes={{ paper: classes.dialogPaper }} maxWidth='md' open={state}>
              <DialogActions>
                <IconButton size='small' onClick={()=> {setstate(false)}}> <CloseIcon/></IconButton>
              </DialogActions>
              {stripePromise
                ? <Elements stripe={stripePromise}>
                  <CustomizedSteppers />
                </Elements>
                : null
              }
            </Dialog>
            </StateProvider>
    </div>
  );
};

export default ShowOrderPage;