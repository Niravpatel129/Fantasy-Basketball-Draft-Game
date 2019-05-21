import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './GameButton.scss';

import checkProps from '@jam3/react-check-extra-props';
class GameButton extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  pageRedirectChooser = () => {
    if (!localStorage.getItem('token')) {
      return '/login';
    } else {
      return '/picks';
    }
  };
  render() {
    return (
      <div className={classnames(`GameButton`, this.props.className)}>
        <div className="button-box">
          <a href={this.pageRedirectChooser()}>
            <img className="button" src={require('../../../src/assets/svg/Button.svg')} alt="Play" />
          </a>
        </div>
      </div>
    );
  }
}

GameButton.propTypes = checkProps({
  className: PropTypes.string
});

GameButton.defaultProps = {};

export default GameButton;
