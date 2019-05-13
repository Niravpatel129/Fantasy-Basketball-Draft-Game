import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './MatchupCard.scss';
import TeamCard from '../TeamCard/TeamCard';
import MatchupInfo from '../MatchupInfo/MatchupInfo';
import SubmitButton from '../SubmitButton/SubmitButton';

class MatchupCard extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`MatchupCard`, this.props.className)}>
        <div className="teamAssign">
          <h2 className="teamTag">HOME</h2>
          <TeamCard teamName="Milwaukee Bucks" />
        </div>
        <div className="teamAssign">
          <h2 className="teamTag">AWAY</h2>
          <TeamCard teamName="Toronto Raptors" />
        </div>
        <h2 className="teamTag">THE MATCHUP</h2>
        <div className="teamAssign">
          <MatchupInfo teamName="Milwaukee Bucks" />
        </div>
        <div className="teamAssign">
          <MatchupInfo teamName="Toronto Raptors" />
        </div>
        <h2 className="teamTag">swipe to view more games</h2>
        <SubmitButton />
      </div>
    );
  }
}

MatchupCard.propTypes = checkProps({
  className: PropTypes.string
});

MatchupCard.defaultProps = {};

export default MatchupCard;
