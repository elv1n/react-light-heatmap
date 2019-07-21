import React from 'react';
import PropTypes from 'prop-types';

const YLabel = React.forwardRef(({ index, height, style, value }, ref) => {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingRight: '5px',
        paddingTop: `${height / 3.7}px`,
        ...style
      }}
      ref={ref}
    >
      {value}
    </div>
  );
});

YLabel.propTypes = {
  index: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
YLabel.defaultProps = {
  style: {}
};

export default YLabel;
