import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './ResultCard.scss';
import TeamCard from '../TeamCard/TeamCard';
// import MatchupInfo from '../MatchupInfo/MatchupInfo';
// import SubmitButton from '../SubmitButton/SubmitButton';
import DateSelect from '../DateSelect/DateSelect';
import LoadScreen from '../LoadScreen/LoadScreen';

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
        <div className={classnames(`ResultCard`, this.props)}>
          <DateSelect date={this.props.gameInfo.date} onSubmit={this.props.onSubmit} />
          <div className={classnames(`ResultCard`, this.props.className)}>
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
    return <LoadScreen />;
  }
}

ResultCard.propTypes = checkProps({
  className: PropTypes.string,
  gameInfo: PropTypes.object,
  onSubmit: PropTypes.func
});

ResultCard.defaultProps = {};

export default ResultCard;
