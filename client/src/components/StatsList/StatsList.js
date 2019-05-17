import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import './StatsList.scss';

import checkProps from '@jam3/react-check-extra-props';

const StatsList = props => {
  const playerStats = props.stats.slice(0, 5).map(stat => {
    return (
      <tr key={stat.player.last_name}>
        <td>
          {stat.player.first_name.charAt(0)}.{stat.player.last_name}
        </td>
        <td>{stat.pts}</td>
        <td>{stat.ast}</td>
        <td>{stat.min}</td>
      </tr>
    );
  });
  return <tbody>{playerStats}</tbody>;
  // }
  // return <div />;
};

StatsList.propTypes = checkProps({
  className: PropTypes.string,
  stats: PropTypes.array
});

StatsList.defaultProps = {};

export default StatsList;
