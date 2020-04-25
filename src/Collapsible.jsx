import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MealCard from "./MealCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

import cyan from "@material-ui/core/colors/cyan";

const Collapsible = ({title, subtitle, list}) => {
  const useStyles = makeStyles((theme) => ({
    column: {
      flexBasis: "33.33%",
    },
    heading: {
      fontSize: 17,
      fontWeight: 'bold'
    },

  }));

  const getMenuItem = (menuObj) => {
    return (
      <Grid item xs={12} sm={6}>
        <MealCard {...menuObj} />
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
          <Typography className={classes.heading}>{title}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>
            {subtitle}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {list.map((coffeMakerObj) =>
            getMenuItem(coffeMakerObj)
          )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Collapsible;