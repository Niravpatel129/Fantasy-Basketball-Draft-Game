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
    return <div className={classnames(`LoginPrompt`, this.props.className)}>LoginPrompt component</div>;
  }
}

LoginPrompt.propTypes = checkProps({
  className: PropTypes.string
});

LoginPrompt.defaultProps = {};

export default LoginPrompt;
