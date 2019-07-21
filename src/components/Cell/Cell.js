import React from 'react';
import PropTypes from 'prop-types';

const Cell = React.forwardRef(
  ({ x, y, value, height, children, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref}>
        <div style={{ paddingTop: `${height / 3.7}px` }}>{children}</div>
      </div>
    );
  }
);

Cell.propTypes = {
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired
};

Cell.defaultProps = {};

export default Cell;
