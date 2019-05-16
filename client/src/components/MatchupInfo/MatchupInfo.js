import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './MatchupInfo.scss';

import checkProps from '@jam3/react-check-extra-props';

import StatsList from '../StatsList/StatsList';

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
              <StatsList stats={this.props.teamStats} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchupInfo.propTypes = checkProps({
  className: PropTypes.string,
  teamName: PropTypes.string,
  teamStats: PropTypes.array
});

MatchupInfo.defaultProps = {};

export default MatchupInfo;
