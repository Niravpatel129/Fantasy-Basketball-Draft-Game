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
    return <div className={classnames(`TeamCard`, this.props.className)}>TeamCard component</div>;
  }
}

TeamCard.propTypes = checkProps({
  className: PropTypes.string
});

TeamCard.defaultProps = {};

export default TeamCard;
