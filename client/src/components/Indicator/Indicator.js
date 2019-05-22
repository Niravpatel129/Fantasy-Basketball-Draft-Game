import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Indicator.scss';

import checkProps from '@jam3/react-check-extra-props';

class Indicator extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    console.log('indicator');
    return (
      <div className={classnames(`Indicator`, this.props.className)}>
        <li>
          <div
            href="/"
            className={
              this.props.index === this.props.activeIndex
                ? 'carousel__indicator carousel__indicator--active'
                : 'carousel__indicator'
            }
          />
        </li>
      </div>
    );
  }
}

Indicator.propTypes = checkProps({
  className: PropTypes.string,
  activeIndex: PropTypes.number,
  length: PropTypes.number,
  index: PropTypes.number
});

Indicator.defaultProps = {};

export default Indicator;
