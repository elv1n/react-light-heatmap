import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import isEqual from 'fast-deep-equal';
import { defaultComponents } from '../components';

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.cacheComponents = memoizeOne(this.cacheComponents, isEqual).bind(this);
    this.cacheComponents(props.components);
  }

  componentWillReceiveProps(nextProps) {
    this.cacheComponents(nextProps.components);
  }
  cacheComponents = components => {
    this.components = defaultComponents(components);
  };

  renderGrid() {
    const {
      background,
      cellStyle,
      data,
      getValue,
      height,
      onClick,
      squares,
      xLabels,
      yLabels,
      xLabelWidth,
      unit
    } = this.props;

    const { Cell, CellContent, YLabel } = this.components;
    const cursor = onClick !== undefined ? 'pointer' : null;

    const values = data.reduce((i, o) => [...o, ...i], []).map(getValue);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return (
      <div>
        {yLabels.map((y, yi) => (
          <div key={yi} style={{ display: 'flex' }}>
            <div style={{ flex: `0 0 ${xLabelWidth}px` }}>
              {YLabel && <YLabel value={y} index={yi} height={height} />}
            </div>
            {xLabels.map((x, xi) => {
              const value = data[yi][xi];
              const style = {
                cursor,
                margin: '1px 1px 0 0',
                height,
                width: squares ? `${height}px` : undefined,
                flex: squares ? 'none' : 1,
                textAlign: 'center',
                ...cellStyle(background, value, min, max, data, xi, yi)
              };
              const title = (value || value === 0) && `${value} ${unit}`;
              return (
                <Cell
                  key={`${xi}_${yi}`}
                  x={xi}
                  y={yi}
                  value={value}
                  onClick={onClick ? () => onClick(xi, yi) : undefined}
                  title={title}
                  style={style}
                  height={height}
                >
                  <CellContent value={value} />
                </Cell>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  renderXLabels() {
    const { xLabels, height, xLabelWidth, squares } = this.props;
    const { XLabel } = this.components;
    if (!XLabel) return null;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: `0 0 ${xLabelWidth}px` }} />
        {xLabels.map((value, i) => (
          <XLabel
            key={i}
            index={i}
            value={value}
            squares={squares}
            height={height}
          />
        ))}
      </div>
    );
  }

  render() {
    const { xLabelsLocation } = this.props;

    return (
      <div>
        {xLabelsLocation === 'top' && this.renderXLabels()}
        {this.renderGrid()}
        {xLabelsLocation === 'bottom' && this.renderXLabels()}
      </div>
    );
  }
}

HeatMap.propTypes = {
  components: PropTypes.object,
  getValue: PropTypes.func,
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  data: PropTypes.array.isRequired,
  background: PropTypes.string,
  height: PropTypes.number,
  xLabelWidth: PropTypes.number,
  xLabelsLocation: PropTypes.oneOf(['top', 'bottom']),
  unit: PropTypes.string,
  onClick: PropTypes.func,
  squares: PropTypes.bool,
  cellStyle: PropTypes.func
};

HeatMap.defaultProps = {
  cellStyle: (background, value, min, max) => ({
    background,
    opacity: (value - min) / (max - min) || 0
  }),
  component: {},
  getValue: value => value,
  background: '#239a3b',
  height: 30,
  xLabelWidth: 60,
  xLabelsLocation: 'top',
  onClick: undefined,
  squares: false,
  unit: ''
};

export default HeatMap;
