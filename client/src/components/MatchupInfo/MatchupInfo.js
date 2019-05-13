import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './MatchupInfo.scss';

import checkProps from '@jam3/react-check-extra-props';

class MatchupInfo extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`MatchupInfo`, this.props.className)}>
        <div className="ui card">
          <div className="content">
            <div className="header">{this.props.teamName}</div>
            <div className="meta">
              <p>Leading Scorers</p>
              <ul>
                <li>G.Antetokounmpo</li>
                <li>K.Middleton</li>
                <li>K.Middleton</li>
                <li>K.Middleton</li>
                <li>K.Middleton</li>
                <li>K.Middleton</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchupInfo.propTypes = checkProps({
  className: PropTypes.string
});

MatchupInfo.defaultProps = {};

export default MatchupInfo;
