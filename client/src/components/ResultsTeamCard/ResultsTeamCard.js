import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ResultsTeamCard.scss';

import checkProps from '@jam3/react-check-extra-props';

class ResultsTeamCard extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`ResultsTeamCard`, this.props.className)}>
        <div className="ui card">
          <div className="content">
            <div className="header">{this.props.teamName}</div>
          </div>
          <div>
            <i className="spinner icon" />
            {this.props.score + ' pts'}
          </div>
        </div>
      </div>
    );
  }
}

ResultsTeamCard.propTypes = checkProps({
  className: PropTypes.string,
  teamName: PropTypes.string,
  onVote: PropTypes.func,
  score: PropTypes.number
});

ResultsTeamCard.defaultProps = {};

export default ResultsTeamCard;
