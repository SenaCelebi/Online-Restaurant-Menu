import React from "react";
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
          title={"Menu"}
          subheader={"Choose available menu items"}
        ></CardHeader>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            
          <KitchenMenuItem list={soapList} title={"Soaps"} subtitle={"Soaps in the Menu"} />
          <KitchenMenuItem list={mealList} title={"Meals"} subtitle={"Meals in the Menu"} />
          <KitchenMenuItem list={dessertList} title={"Desserts"} subtitle={"Desserts in the Menu"} />


          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default KitchenMenuPage;
