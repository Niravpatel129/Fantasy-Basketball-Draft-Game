import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './MatchupCard.scss';
import TeamCard from '../TeamCard/TeamCard';

class MatchupCard extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`MatchupCard`, this.props.className)}>
        <div className="teamAssign">
          <h1>Home</h1>
          <TeamCard teamName="Milwaukee Bucks" />
        </div>
        <div className="teamAssign">
          <h1>Away</h1>
          <TeamCard teamName="Toronto Raptors" />
        </div>
      </div>
    );
  }
}

MatchupCard.propTypes = checkProps({
  className: PropTypes.string
});

MatchupCard.defaultProps = {};

export default MatchupCard;
