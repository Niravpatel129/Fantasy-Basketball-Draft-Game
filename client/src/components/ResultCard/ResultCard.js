import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './ResultCard.scss';
import TeamCard from '../TeamCard/TeamCard';
import DateSelect from '../DateSelect/DateSelect';

class ResultCard extends React.PureComponent {
  state = {
    gameInfo: this.props.gameInfo
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    this.setState({
      gameInfo: this.props.gameInfo
    });
  }

  render() {
    if (this.state.gameInfo.response) {
      const homeTeam = this.state.gameInfo.picks[this.props.gameInfo.currentPickIndex].homeTeam;
      const awayTeam = this.state.gameInfo.picks[this.props.gameInfo.currentPickIndex].awayTeam;

      return (
        <div className={classnames(`MatchupCard`, this.props)}>
          <DateSelect date={this.props.gameInfo.date} />
          <div className={classnames(`MatchupCard`, this.props.className)}>
            <div className="teamAssign">
              <h2 className="teamTag">HOME</h2>
              <TeamCard teamName={homeTeam} className="winner" />
            </div>
            <div className="teamAssign">
              <h2 className="teamTag">AWAY</h2>
              <TeamCard teamName={awayTeam} />
            </div>
          </div>
        </div>
      );
    }
    return <p>Loading..</p>;
  }
}

ResultCard.propTypes = checkProps({
  className: PropTypes.string,
  gameInfo: PropTypes.object
});

ResultCard.defaultProps = {};

export default ResultCard;
