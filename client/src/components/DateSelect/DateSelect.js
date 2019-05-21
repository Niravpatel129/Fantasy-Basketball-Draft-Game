import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './DateSelect.scss';

import checkProps from '@jam3/react-check-extra-props';

class DateSelect extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  // initEditor = () => {
  //   this.editor =
  // }

  // onEdit = () => {
  //   console.log('help');
  // };

  render() {
    return (
      <div className={classnames(`DateSelect`, this.props.className)}>
        <div className="ui label">
          <i className="calendar outline icon" />
          <input type="text" defaultValue={this.props.date} onKeyDown={this.props.onSubmit} />
        </div>
      </div>
    );
  }
}

DateSelect.propTypes = checkProps({
  className: PropTypes.string,
  date: PropTypes.string,
  onSubmit: PropTypes.func
});

DateSelect.defaultProps = {};

export default DateSelect;
