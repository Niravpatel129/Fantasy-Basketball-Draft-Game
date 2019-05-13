import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './SubmitButton.scss';

import checkProps from '@jam3/react-check-extra-props';

class SubmitButton extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`SubmitButton`, this.props.className)}>
        <div className="ui animated fade button" tabIndex="0">
          <div className="visible content"> SUBMIT PICKS </div>
          <div className="hidden content">LET THE MADNESS BEGIN</div>
        </div>
      </div>
    );
  }
}

SubmitButton.propTypes = checkProps({
  className: PropTypes.string
});

SubmitButton.defaultProps = {};

export default SubmitButton;