import React from "react";
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
  return (
    
      <Card raised>
        <div>
          <CardHeader title={orderItem.key} />
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
            <Button size="small" fullWidth>
              SUBMIT
            </Button>
          </CardActions>
        </div>
      </Card>
  );
};

export default OrderCard;
