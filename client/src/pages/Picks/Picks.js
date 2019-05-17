import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
// import { Redirect } from 'react-router-dom';

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
      authCode: '',
      access_token: '',
      response: 0,
      date: '',
      picks: [],
      stats: [],
      currentPickIndex: 0
    };
  }

  componentDidMount() {
    this.checkAuth();
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

  checkAuth = () => {
    if (!localStorage.getItem('token')) {
      console.log('Token not found: logging in..');
      let url = window.location.href;
      let spliturl = url.split('?');
      let code = '';
      if (spliturl[1]) {
        code = spliturl[1].substring(5, spliturl[1].length - 7);
      } else {
        code = '';
      }
      this.setState({ authCode: code });

      axios
        .get(
          'https://slack.com/api/oauth.access?client_id=2222937506.634323100293&client_secret=526319ccf98aac5aa4f81a31a8e4a4fd&code=' +
            code
        )
        .then(res => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            this.setState({ access_token: res.data.access_token });
            localStorage.setItem('token', res.data.access_token);
          }
        });
    } else {
      console.log('User is already logged in, fetching user data :)');
      console.log('Token is: ', localStorage.getItem('token'));
      this.setState({ access_token: localStorage.getItem('token') });
      axios.get('https://slack.com/api/users.identity?token=' + localStorage.getItem('token')).then(res => {
        this.setState({
          user: {
            email: res.data.user.email,
            id: res.data.user.id,
            name: res.data.user.name
          }
        });
      });
    }
  };

  onCastVoteEvent = team => {
    this.setState(prevState => ({
      picks: prevState.picks.map((pick, index) => {
        return index === this.state.currentPickIndex ? Object.assign(pick, { selection: team }) : pick;
      })
    }));
  };

  onSubmitPicksEvent = () => {
    console.log('submitting picks to database', this.state);
  };

  render() {
    if (this.state.access_token) {
      if (this.state.picks.length > 1) {
        return (
          <section className={classnames('Picks', this.props.className)} ref={el => (this.container = el)}>
            <Arrow className="left" onClick={this.prevPick} />
            <MatchupCard onVote={this.onCastVoteEvent} onSubmit={this.onSubmitPicksEvent} gameInfo={this.state} />
            <Arrow className="right" onClick={this.nextPick} />
          </section>
        );
      }
      return (
        <section className={classnames('Picks', this.props.className)} ref={el => (this.container = el)}>
          <MatchupCard gameInfo={this.state} onVote={this.onCastVoteEvent} onSubmit={this.onSubmitPicksEvent} />
        </section>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
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
