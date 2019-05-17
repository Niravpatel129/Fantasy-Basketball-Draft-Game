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
    const { length, position } = this.props;

    return (
      <div className={classnames(`Indicator`, this.props.className)}>
        <li>
          <a
            className={
              this.props.position == this.props.activeIndex
                ? 'carousel__indicator carousel__indicator--active'
                : 'carousel__indicator'
            }
            onClick={this.props.onClick}
          />
        </li>
      </div>
    );
  }
}

Indicator.propTypes = checkProps({
  className: PropTypes.string,
  position: PropTypes.number,
  length: PropTypes.number,
  activeIndex: PropTypes.number
});

Indicator.defaultProps = {};

export default Indicator;
