import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { BaseLink } from '@jam3/react-ui';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import './Picks.scss';
import { gamesApi } from '../../api/gamesApi.js';
import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';
import MatchupCard from '../../components/MatchupCard/MatchupCard';
import Arrow from '../../components/Arrow/Arrow';

class Picks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      response: 0,
      date: '',
      picks: [],
      currentPickIndex: 0
    };
  }

  componentDidMount() {
    var today = [pad(new Date().getFullYear(), 4), pad(new Date().getMonth() + 1, 2), pad(new Date().getDate(), 2)];
    var startdate = today.join('-'),
      enddate = today.join('-');

    gamesApi(startdate, enddate)
      .then(res => {
        const teams = res.data.data;
        teams.map(game => {
          this.setState({
            date: startdate,
            picks: [
              ...this.state.picks,
              {
                gameId: game.id,
                homeTeam: game.home_team.full_name,
                awayTeam: game.visitor_team.full_name,
                selection: ''
              }
            ]
          });
          return true;
        });
        this.setState({ response: 1 });
      })
      .catch(error => {
        console.log(error);
      });

    animate.set(this.container, { autoAlpha: 0 });
    // let code = window.location.href;
  }
  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  prevPick = () => {
    const lastIndex = this.state.picks.length - 1;

    const resetIndex = this.state.currentPickIndex === 0;
    const index = resetIndex ? lastIndex : this.state.currentPickIndex - 1;

    this.setState({
      currentPickIndex: index
    });
  };

  nextPick = () => {
    const lastIndex = this.state.picks.length - 1;

    const resetIndex = this.state.currentPickIndex === lastIndex;
    const index = resetIndex ? 0 : this.state.currentPickIndex + 1;

    this.setState({
      currentPickIndex: index
    });
  };

  onCastVoteEvent = team => {
    this.setState(prevState => ({
      picks: prevState.picks.map((pick, index) => {
        return index === this.state.currentPickIndex ? Object.assign(pick, { selection: team }) : pick;
      })
    }));
    console.log(this.state);
  };

  render() {
    if (this.state.picks.length > 1) {
      return (
        <section className={classnames('Picks', this.props.className)} ref={el => (this.container = el)}>
          <Arrow className="left" onClick={this.prevPick} />
          <MatchupCard onVote={this.onCastVoteEvent} gameInfo={this.state} />
          <Arrow className="right" onClick={this.nextPick} />
        </section>
      );
    }
    return (
      <section className={classnames('Picks', this.props.className)} ref={el => (this.container = el)}>
        <MatchupCard gameInfo={this.state} onVote={this.onCastVoteEvent} />
      </section>
    );
  }
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

Picks.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

Picks.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Picks));
