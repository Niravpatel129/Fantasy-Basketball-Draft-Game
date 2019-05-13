import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './TeamCard.scss';

import checkProps from '@jam3/react-check-extra-props';

class TeamCard extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={classnames(`TeamCard`, this.props.className)}>
        <div class="ui card">
          <div class="content">
            <div class="header">{this.props.teamName}</div>
          </div>
          <div class="ui bottom attached button">
            <i class="basketball ball icon" />
            Cast Vote
          </div>
        </div>
      </div>
    );
  }
}

TeamCard.propTypes = checkProps({
  className: PropTypes.string
});

TeamCard.defaultProps = {};

export default TeamCard;
