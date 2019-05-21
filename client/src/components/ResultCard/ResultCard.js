import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './ResultCard.scss';
import ResultsTeamCard from '../ResultsTeamCard/ResultsTeamCard';
// import MatchupInfo from '../MatchupInfo/MatchupInfo';
// import SubmitButton from '../SubmitButton/SubmitButton';
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
  clearCards = () => {
    React.unmountComponentAtNode(document.getElementById('teamCard'));
  };

  renderCards = () => {
    // this.clearCards();
    console.log(this.props.gameInfo.picks);
    return this.props.gameInfo.picks.map(game => {
      let homeClass = '';
      let awayClass = '';

      if (game.selection === game.homeTeam) {
        game.selection === game.winner ? (homeClass = 'correct') : (homeClass = 'incorrect');
      } else if (game.selection === game.awayTeam) {
        game.selection === game.winner ? (awayClass = 'correct') : (awayClass = 'incorrect');
      }

      return (
        <div className={classnames(`ResultCard`, this.props)}>
          <ResultsTeamCard key={game.homeTeam} teamName={game.homeTeam} score={game.homeScore} className={homeClass} />
          <ResultsTeamCard key={game.awayTeam} teamName={game.awayTeam} score={game.awayScore} className={awayClass} />
        </div>
      );
    });
  };

  render() {
    if (this.state.gameInfo.response) {
      console.log('getting cards');
      return this.renderCards();
    } else return <LoadScreen />;
  }
}

ResultCard.propTypes = checkProps({
  className: PropTypes.string,
  gameInfo: PropTypes.object,
  onSubmit: PropTypes.func
});

ResultCard.defaultProps = {};

export default ResultCard;
