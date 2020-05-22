import React, {useState, useEffect} from "react";
import firebase from "./Config";
import { dessertList, soapList, mealList } from "./constants";
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


const OrderCard = ({orderItem}) => {

const[tempList, setTempList] = useState(mealList);

const updateToCart = (list) => {
  console.log(list);
  setTempList(list);
  console.log(tempList);
  for(var i=0; i<list.length; i++){
    if(list[i].MealPrice != 0){
      let deletedRef = firebase.database().ref('Orders/Table4/Meals/' + list[i].TimeStamp);
      deletedRef.remove();
    }
  }
}

  return (
      <Card raised>
        <div>
          <CardHeader title={orderItem.title} />
          <CardMedia
            style={{ height: "60px" }}
            image={"https://www.barazzi.com/img/c/10.jpg"}
          />
          <CardContent>
            <Typography variant="body2" component="p">
             {Object.values(orderItem.Meals).map( meal =>  <Grid container>
                    <Grid item xs={7}>
                      {meal.MealName}
                    </Grid>
                  </Grid> )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => updateToCart(Object.values(orderItem.Meals))} fullWidth>
              SUBMIT
            </Button>
            
          </CardActions>
        </div>
      </Card>
  );
};

export default OrderCard;