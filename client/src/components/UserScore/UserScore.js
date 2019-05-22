import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './UserScore.scss';

import checkProps from '@jam3/react-check-extra-props';

class UserScore extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <li className={classnames(`UserScore`, this.props.className)}>
        <mark>Player Name</mark>
        <small>Player Record</small>
      </li>
    );
  }
}

UserScore.propTypes = checkProps({
  className: PropTypes.string
});

UserScore.defaultProps = {};

export default UserScore;
