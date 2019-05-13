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
        <a href="/pick">
          {' '}
          <div>
            <img className={this.props.direction} src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
          </div>
          <div>
            <img className={this.props.direction} src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
          </div>
          <div>
            <img className={this.props.direction} src={require('../../../src/assets/svg/Path.svg')} alt="Path" />
          </div>
        </a>
      </div>
    );
  }
}

Arrow.propTypes = checkProps({
  className: PropTypes.string
});

Arrow.defaultProps = {};

export default Arrow;
