import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Date.scss';

import checkProps from '@jam3/react-check-extra-props';

const Date = React.memo(
  React.forwardRef((props, ref) => {
    const componentProps = {
      className: classnames('Date', props.className),
      date: props.date
    };

    return (
      <div {...componentProps} ref={ref}>
        <div className="ui label">
          <i className="calendar outline icon" /> {componentProps.date}
        </div>
      </div>
    );
  })
);

Date.propTypes = checkProps({
  className: PropTypes.string,
  date: PropTypes.string
});

Date.defaultProps = {};

export default Date;
