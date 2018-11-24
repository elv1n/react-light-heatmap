import React from 'react';
import PropTypes from 'prop-types';

function Cell({ x, y, value, height, children, ...rest }) {
  return (
    <div {...rest}>
      <div style={{ paddingTop: `${height / 3.7}px` }}>{children}</div>
    </div>
  );
}

Cell.propTypes = {
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired
};

Cell.defaultProps = {};

export default Cell;
