import React, { Component, Fragment } from 'react';

import HeatMap, { components } from 'react-light-heatmap';
import Tooltip from 'react-tooltip';
import { simpleData } from './utils';

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

export default function Customize() {
  return (
    <HeatMap
      xLabelsLocation={'bottom'}
      xLabelWidth={50}
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
      {...simpleData()}
    />
  );
}
