import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { BaseLink } from '@jam3/react-ui';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import './Picks.scss';
import axios from 'axios';
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
      stats: [],
      currentPickIndex: 0
    };
  }

  componentDidMount() {
    var today = [pad(new Date().getFullYear(), 4), pad(new Date().getMonth() + 1, 2), pad(new Date().getDate(), 2)];
    var startdate = today.join('-');
    // var startdate = '2019-02-13';

    // Make a request for a user with a given ID
    axios
      .get('/games', {
        params: {
          product: startdate
        }
      })
      .then(res => {
        const teams = res.data.data;
        teams.map(game => {
          console.log('getting todays games');
          this.setState({
            date: startdate,
            picks: [
              ...this.state.picks,
              {
                gameId: game.id,
                homeTeam: game.home_team.full_name,
                homeTeamId: game.home_team.id,
                awayTeam: game.visitor_team.full_name,
                awayTeamId: game.visitor_team.id,
                selection: ''
              }
            ]
          });
        });

        teams.map(game => {
          axios
            .get('/data', { params: { team_id: game.home_team.id } })
            .then(res => {
              this.setState({
                stats: [
                  ...this.state.stats,
                  {
                    teamId: game.home_team.id,
                    playerStats: res.data
                  }
                ]
              });
            })
            .catch(err => console.log(err));

          axios
            .get('/data', { params: { team_id: game.visitor_team.id } })
            .then(res => {
              this.setState({
                stats: [
                  ...this.state.stats,
                  {
                    teamId: game.visitor_team.id,
                    playerStats: res.data
                  }
                ]
              });
            })
            .catch(err => console.log(err));
        });
        this.setState({ response: 1 });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
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
