import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Arrow.scss';

import checkProps from '@jam3/react-check-extra-props';
class Arrow extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`Arrow`, this.props.className)}>
        <img src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
        <img src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
        <img src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
      </div>
    );
  }
}

Arrow.propTypes = checkProps({
  className: PropTypes.string
});

Arrow.defaultProps = {};

export default Arrow;
