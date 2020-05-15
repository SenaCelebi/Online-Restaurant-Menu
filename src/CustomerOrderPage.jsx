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
import { dessertList, soapList, mealList } from "./constants";
import Collapsible from "./Collapsible";
import firebase from "./Config";


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
            title={"Table 5"}
            subheader={"Create your order for table 5"}
          ></CardHeader>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Collapsible
                list={soapList}
                title={"Soaps"}
                subtitle={"Select a soap"}
              />
            </Grid>
            <Grid item>
              <Collapsible
                list={mealList}
                title={"Meals"}
                subtitle={"Select a meal"}
              />
            </Grid>
            <Grid item>
              <Collapsible
                list={dessertList}
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
