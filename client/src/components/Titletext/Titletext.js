import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Titletext.scss';

import checkProps from '@jam3/react-check-extra-props';

class Titletext extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div className={classnames(`Titletext`, this.props.className)}>{this.props.title}</div>;
  }
}

Titletext.propTypes = checkProps({
  className: PropTypes.string
});

Titletext.defaultProps = {};

export default Titletext;
