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
          <CardHeader title={orderItem.title} />
          <CardMedia
            style={{ height: "60px" }}
            image={"https://www.barazzi.com/img/c/10.jpg"}
          />
          <CardContent>
            <Typography variant="body2" component="p">
             {orderItem.meals.map( meal =>  <Grid container>
                    <Grid item xs={7}>
                      {meal.name}
                    </Grid>
                    <Grid item xs={5}>
                      <Button size="small" color="secondary">
                        In progress
                      </Button>
                      <Button size="small">Ready</Button>
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
