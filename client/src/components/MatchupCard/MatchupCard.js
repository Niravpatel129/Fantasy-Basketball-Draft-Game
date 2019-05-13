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
        <TeamCard />
      </div>
    );
  }
}

MatchupCard.propTypes = checkProps({
  className: PropTypes.string
});

MatchupCard.defaultProps = {};

export default MatchupCard;
