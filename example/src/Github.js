import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  startOfWeek,
  subYears,
  subWeeks,
  addDays,
  addMonths,
  format,
  compareAsc,
  differenceInDays,
  differenceInCalendarWeeks,
  isSameMonth
} from 'date-fns';
import { MuiThemeProvider, Tooltip } from '@material-ui/core';
import HeatMap, { components } from 'react-light-heatmap';
import Typography from '@material-ui/core/es/Typography/Typography';

const today = new Date();
const start = startOfWeek(subYears(today, 1));
const diff = differenceInDays(today, start);
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const data = days.map(() =>
  new Array(diff)
    .fill(null)
    .map(() => Math.floor(Math.random() * (12 - 1 + 1)) + 1)
);

const weeks = differenceInCalendarWeeks(today, start);

let months = [format(start, 'MMM')];
for (let i = 1; i < weeks; i++) {
  const nextWeek = subWeeks(today, weeks - i - 1);
  if (isSameMonth(nextWeek, subWeeks(today, weeks - i))) {
    months.push(null);
  } else {
    months.push(format(nextWeek, 'MMM'));
  }
}

const YLabel = ({ index, ...rest }) => {
  if (index % 2 === 0) return null;
  return (
    <Typography variant="subtitle2" component="div">
      <components.YLabel {...rest} />
    </Typography>
  );
};
const XLabel = props => {
  return (
    <Typography variant="overline" component="div">
      <components.XLabel {...props} />
    </Typography>
  );
};

const getTitle = ({ value, x, y }) => {
  let title = null;
  const day = addDays(subWeeks(today, x), y);
  switch (value) {
    case 0: {
      title = 'No contributions';
      break;
    }
    case 1: {
      title = '1 contribution';
      break;
    }
    default:
      title = `${value} contributions`;
  }
  return `${title} on ${format(day, 'MMM D YYYY')}`;
};

const Cell = ({ title, ...rest }) => {
  const { value, x, y } = rest;
  return (
    <Tooltip title={getTitle({ value, x, y })}>
      <components.Cell {...rest} />
    </Tooltip>
  );
};

class Github extends Component {
  render() {
    return (
      <HeatMap
        xLabels={months}
        yLabels={days}
        dataCount={diff}
        data={data}
        squares
        components={{
          YLabel,
          XLabel,
          Cell
        }}
      />
    );
  }
}

Github.propTypes = {};
Github.defaultProps = {};

export default Github;
