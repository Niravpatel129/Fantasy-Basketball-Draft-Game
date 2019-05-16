import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './StatsList.scss';

import checkProps from '@jam3/react-check-extra-props';

const StatsList = props => {
  if (props.stats.length) {
    const playerStats = props.stats.map(stat => {
      console.log(stat.player.first_name);
      return (
        <li>
          {stat.player.first_name} {stat.player.last_name}
        </li>
      );
    });
    return <div>{playerStats}</div>;
  }
  return <div />;
};

StatsList.propTypes = checkProps({
  className: PropTypes.string,
  stats: PropTypes.array
});

StatsList.defaultProps = {};

export default StatsList;
