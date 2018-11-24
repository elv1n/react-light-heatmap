import React, { Component, Fragment } from 'react';

import HeatMap, { components } from 'react-light-heatmap';
import Tooltip from 'react-tooltip';

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

// Display only even labels
const xLabelsVisibility = new Array(24).fill(0).map((_, i) => i % 2 === 0);

const yLabels = ['Sun', 'Mon', 'Tue'];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );

const CellRender = props => {
  const { x, y, value } = props;
  const id = `cell-${x}-${y}`;
  return (
    <Fragment>
      <Tooltip id={id} effect='solid'>
        {value}
      </Tooltip>
      <components.Cell data-tip data-for={id} {...props} />
    </Fragment>
  );
};

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Simple Example</h2>
        <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} squares />
        <h2>Customization</h2>
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsLocation={'bottom'}
          xLabelsVisibility={xLabelsVisibility}
          xLabelWidth={50}
          data={data}
          squares
          onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgb(66, 86, 244, ${1 - (max - value) / (max - min)})`,
            fontSize: '11px'
          })}
          components={{
            Cell: CellRender,
            CellContent: ({ value }) => value && `${value}%`
          }}
        />
      </div>
    );
  }
}
