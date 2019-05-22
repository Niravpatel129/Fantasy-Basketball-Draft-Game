import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import { Redirect } from 'react-router-dom';

import './Results.scss';

import axios from 'axios';
import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';
import ResultCard from '../../components/ResultCard/ResultCard';
import DateSelect from '../../components/DateSelect/DateSelect';

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
    console.log(yesterday);

    console.log(localStorage.getItem('user'), 'is the user.');

    this.getResults(yesterday);

    animate.set(this.container, { autoAlpha: 0 });
    // let code = window.location.href;
  }

  getResults = date => {
    axios.get('/results', { params: { name: localStorage.getItem('user'), date: date } }).then(response => {
      if (response.data !== 'no data for this date') {
        const scores = response.data;
        scores.map(game => {
          this.setState({
            date: date,
            picks: [
              ...this.state.picks,
              {
                homeTeam: game.homeTeam.team,
                homeScore: game.homeTeam.score,
                awayTeam: game.visitorTeam.team,
                awayScore: game.visitorTeam.score,
                selection: game.selectionTeam,
                winner: game.gameWinner
              }
            ]
          });
          return true;
        });
        this.setState({ response: 1 });
      } else this.setState({ response: -1, date: date });
    });
  };

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
        console.log('getting data', event.target.value);
        this.setState({ picks: [] });
        this.getResults(event.target.value);
      }
    }
  };

  render() {
    console.log(this.state.response);

    if (!localStorage.getItem('token')) {
      return (
        <div>
          <h1>You need to login, sending you to the login page!</h1>
          <Redirect to="/login" />
        </div>
      );
    } else {
      if (this.state.response === 1) {
        return (
          <section className={classnames('Results', this.props.className)} ref={el => (this.container = el)}>
            <DateSelect date={this.state.date} onSubmit={this.onDateChange} />
            <div className="teamCard">
              <div className="teamAssign">
                <h2 className="teamTag">HOME</h2>
                <h2 className="teamTag">AWAY</h2>
              </div>
              <ResultCard gameInfo={this.state} onSubmit={this.onDateChange} />
            </div>
            <h2 className="teamTag scroll">scroll to see more results</h2>
          </section>
        );
      } else {
        return (
          <div>
            <DateSelect date={this.state.date} onSubmit={this.onDateChange} />
            <h2 className="teamTag error">There are no picks for the selected date</h2>
          </div>
        );
      }
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
