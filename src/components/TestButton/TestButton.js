import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './TestButton.scss';

import checkProps from '@jam3/react-check-extra-props';

class TestButton extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div className={classnames(`TestButton`, this.props.className)}>TestButton component</div>;
  }
}

TestButton.propTypes = checkProps({
  className: PropTypes.string
});

TestButton.defaultProps = {};

export default TestButton;
