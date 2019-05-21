import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { BaseLink } from '@jam3/react-ui';
// import { HamburgerMenu, MainTopNav, PageOverlay } from '@jam3/react-ui';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
// import mainNavData from '../../data/main-nav';
import { Redirect } from 'react-router-dom';

import './Results.scss';
import axios from 'axios';
import { gamesApi } from '../../api/gamesApi.js';
import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';
import ResultCard from '../../components/ResultCard/ResultCard';
// import Arrow from '../../components/Arrow/Arrow';

class Results extends React.PureComponent {
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
    var yesterday = new Date();
    var dd = String(yesterday.getDate() - 1).padStart(2, '0');
    var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = yesterday.getFullYear();
    yesterday = yyyy + '-' + mm + '-' + dd;

    console.log(localStorage.getItem('user'), 'is the user.');

    axios.get('/results', { params: { name: localStorage.getItem('user'), date: yesterday } }).then(response => {
      console.log(response);
      const scores = response.data;
      scores.map(game => {
        this.setState({
          date: yesterday,
          picks: [
            ...this.state.picks,
            {
              homeTeam: game.homeTeam.team,
              homeScore: game.homeTeam.score,
              awayTeam: game.visitorTeam.team,
              awayScore: game.visitorTeam.score
            }
          ]
        });
        return true;
      });
      this.setState({ response: 1 });
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

  onDateChange = event => {
    if (event.keyCode === 13) {
      let date = event.target.value.split('-');
      if (parseInt(date[1], 10) <= 12 && parseInt(date[2], 10) <= 31) {
        this.setState({ date: event.target.value });
      }
    }
  };

  render() {
    if (!localStorage.getItem('token')) {
      return (
        <div>
          <h1>You need to login, sending you to the login page!</h1>
          <Redirect to="/login" />
        </div>
      );
    } else {
      return (
        <section className={classnames('Results', this.props.className)} ref={el => (this.container = el)}>
          {/* <ResultCard gameInfo={this.state} onSubmit={this.onDateChange} /> */}
        </section>
      );
    }
  }
}

Results.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

Results.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Results));
