import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './InfoBox.scss';

import checkProps from '@jam3/react-check-extra-props';
class InfoBox extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`InfoBox`, this.props.className)}>
        <div className="box">
          <div className="text">
            Welcome to the JAM3 Fantasy Basketball Picker. Make your predictions, track the games and rule to office.
            <br />
            <br />
            Playing is easy. Simply make and submit your predicitions, follow along and earn points for guessing
            correctly.
            <br />
            <br /> Check out the leaderboard to see how you stack up. <br />
            <br />
            Sign in to slack to step into the action.
          </div>
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = checkProps({
  className: PropTypes.string
});

InfoBox.defaultProps = {};

export default InfoBox;
