import React, { Component, Fragment } from 'react';
import {
  withStyles,
  Typography,
  CardHeader,
  Paper,
  Grid
} from '@material-ui/core';
import Github from './Github';
import Customize from './Customize';
import HeatMap from 'react-light-heatmap';

import { simpleData } from './utils';

const styles = theme => ({
  paper: {
    overflowX: 'auto',
    padding: theme.spacing.unit * 2
  }
});

function MainPage({ classes }) {
  return (
    <div>
      <Typography gutterBottom variant="h2">
        react-light-heatmap{' '}
        <a
          className="github-button"
          href="https://github.com/elv1n/react-light-heatmap"
          data-size="large"
          aria-label="Star elv1n/react-light-heatmap on GitHub"
        >
          Star
        </a>
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Github like example</Typography>
            <Github />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Simple</Typography>
            <HeatMap {...simpleData()} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Custom</Typography>
            <Customize />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MainPage);
