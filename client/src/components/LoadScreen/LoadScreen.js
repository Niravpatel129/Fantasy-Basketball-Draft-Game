import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './LoadScreen.scss';

import checkProps from '@jam3/react-check-extra-props';

const LoadScreen = React.memo(
  React.forwardRef((props, ref) => {
    const componentProps = {
      className: classnames('LoadScreen', props.className)
    };

    return (
      <div className="ui active dimmer">
        <div className="ui text inverted  loader">Loading</div>
      </div>
    );
  })
);

LoadScreen.propTypes = checkProps({
  className: PropTypes.string
});

LoadScreen.defaultProps = {};

export default LoadScreen;
