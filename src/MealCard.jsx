import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold'
  },
}));


const MealCard = (props) => {
  const classes = useStyles();
  const { MeaLAvailability, MealDesc, MealImage, MealName, MealPrice, buttons } = props;
  return (
    <Card className={classes.root} raised>
      <div className={classes.details}>
        <CardHeader
          title={MealName}
          subheader={"$" + MealPrice}
        />
        <CardMedia style={{ height: "170px" }} image={MealImage} />
        <CardContent>
          <Typography variant="body2" component="p">
            {MealDesc}
          </Typography>
        </CardContent>
        <CardActions>
        {buttons.map(button => <Button size="small">{button.title}</Button>)}
        </CardActions>
      </div>
    </Card>
  );
};

export default MealCard;
