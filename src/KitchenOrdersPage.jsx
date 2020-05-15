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
import { makeStyles } from "@material-ui/core/styles";
import { orderList } from "./constants";
import OrderCard from "./OrderCard";

const KitchenOrdersPage = () => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Card style={{ backgroundColor: "#ffffff" }} raised>
        <CardMedia
          component="img"
          alt="Table 5"
          height="200"
          image="https://ak5.picdn.net/shutterstock/videos/28204555/thumb/1.jpg"
          title="Table 5"
        />
        <CardHeader
          title={"Orders"}
          subheader={"Orders from customers"}
        ></CardHeader>
        <CardContent>
          <Grid container spacing={4}>
            {orderList.map((table) => (
              <Grid item xs={12} md={6}>
                <OrderCard orderItem={table} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default KitchenOrdersPage;
