import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

import './UserScore.scss';

import checkProps from '@jam3/react-check-extra-props';

class UserScore extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  renderUsers = data => {
    console.log('mapping');
    return data.map(user => {
      console.log(user.avatar);
      return (
        <li>
          <mark>{user.username}</mark>
          <small>{user.score}</small>
          <img src={user.avatar} alt="avatar" />
        </li>
      );
    });
  };

  render() {
    const leaders = this.renderUsers(this.props.data.users);
    return leaders;
  }
}

UserScore.propTypes = checkProps({
  className: PropTypes.string,
  data: PropTypes.object
});

UserScore.defaultProps = {};

export default UserScore;
