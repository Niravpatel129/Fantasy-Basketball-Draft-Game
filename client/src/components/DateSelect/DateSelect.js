import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './DateSelect.scss';

import checkProps from '@jam3/react-check-extra-props';

class DateSelect extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`DateSelect`, this.props.className)}>
        <div className="ui label">
          <i className="calendar outline icon" /> YYYY-MM-DD
        </div>
      </div>
    );
  }
}

DateSelect.propTypes = checkProps({
  className: PropTypes.string
});

DateSelect.defaultProps = {};

export default DateSelect;
