import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Arrow.scss';

import checkProps from '@jam3/react-check-extra-props';
class Arrow extends React.PureComponent {
  state = {};

  componentDidMount() {
    console.log('arrows props:', this.props);
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`Arrow`, this.props.className)}>
        <div>
          <img
            onClick={this.props.onClick}
            className={this.props.direction}
            id={this.props.id}
            src={require('../../../src/assets/svg/Path.svg')}
            alt="Path"
          />
        </div>
      </div>
    );
  }
}

Arrow.propTypes = checkProps({
  className: PropTypes.string,
  onClick: PropTypes.func
});

Arrow.defaultProps = {};

export default Arrow;
