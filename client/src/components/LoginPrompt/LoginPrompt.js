import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './LoginPrompt.scss';

import checkProps from '@jam3/react-check-extra-props';

class LoginPrompt extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`LoginPrompt`, this.props.className)}>
        <img
          onClick={this.props.onClick}
          height="40"
          width="172"
          alt="slack"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
      </div>
    );
  }
}

LoginPrompt.propTypes = checkProps({
  className: PropTypes.string
});

LoginPrompt.defaultProps = {};

export default LoginPrompt;
