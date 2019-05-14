import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { BaseLink } from '@jam3/react-ui';
// import { HamburgerMenu, MainTopNav, PageOverlay } from '@jam3/react-ui';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
// import mainNavData from '../../data/main-nav';

import './Results.scss';

import { gamesApi } from '../../api/gamesApi.js';
import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';
import ResultCard from '../../components/ResultCard/ResultCard';
import Arrow from '../../components/Arrow/Arrow';

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
    let startdate = '2019-02-13';
    let enddate = '2019-02-13';

    gamesApi(startdate, enddate)
      .then(res => {
        const teams = res.data.data;
        console.log(teams);
        teams.map(game => {
          this.setState({
            date: startdate,
            picks: [
              ...this.state.picks,
              {
                gameId: game.id,
                homeTeam: game.home_team.city,
                homeScore: game.home_team_score,
                awayTeam: game.visitor_team.city,
                awayScore: game.visitor_team_score,
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

  render() {
    return (
      <section className={classnames('Results', this.props.className)} ref={el => (this.container = el)}>
        <Arrow className="left" onClick={this.prevPick} />
        <ResultCard gameInfo={this.state} />
        <Arrow className="right" onClick={this.nextPick} />
      </section>
    );
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
