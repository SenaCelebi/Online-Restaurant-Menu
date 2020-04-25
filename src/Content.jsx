import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CoffeCard from "./CoffeCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import coffeMakerList from "./constants";

const Content = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));

  const getCoffeMakerCard = (coffeMakerObj) => {
    return (
      <Grid item xs={12} sm={6}>
        <CoffeCard {...coffeMakerObj} />
      </Grid>
    );
  };
  const classes = useStyles();
  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Location</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>
            Select trip destination
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {coffeMakerList.map((coffeMakerObj) =>
            getCoffeMakerCard(coffeMakerObj)
          )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Content;