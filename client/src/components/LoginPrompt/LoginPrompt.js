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
        <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=2222937506.634323100293">
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </div>
    );
  }
}

LoginPrompt.propTypes = checkProps({
  className: PropTypes.string
});

LoginPrompt.defaultProps = {};

export default LoginPrompt;
