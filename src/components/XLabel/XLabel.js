import React from 'react';
import PropTypes from 'prop-types';

const XLabel = React.forwardRef(
  ({ index, height, squares, style, value }, ref) => {
    return (
      <div
        style={{
          flex: squares ? 'none' : 1,
          textAlign: 'center',
          width: squares ? `${height + 1}px` : 'undefined',
          ...style
        }}
        ref={ref}
      >
        {value}
      </div>
    );
  }
);

XLabel.propTypes = {
  height: PropTypes.number,
  index: PropTypes.number,
  squares: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
XLabel.defaultProps = {
  style: {}
};

export default XLabel;
