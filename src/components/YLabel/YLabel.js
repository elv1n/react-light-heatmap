import React from 'react';
import PropTypes from 'prop-types';

function YLabel({ index, height, style, value }) {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingRight: '5px',
        paddingTop: `${height / 3.7}px`,
        ...style
      }}
    >
      {value}
    </div>
  );
}

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
