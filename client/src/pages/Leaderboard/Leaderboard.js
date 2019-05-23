import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './Leaderboard.scss';

import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';
import UserScore from '../../components/UserScore/UserScore';
import LoadScreen from '../../components/LoadScreen/LoadScreen';

class Leaderboard extends React.PureComponent {
  state = {
    response: 0,
    users: []
  };

  componentDidMount() {
    axios.get('/leaderboards').then(data => {
      data.data.map(user => {
        this.setState({
          users: [
            ...this.state.users,
            {
              username: user.username,
              score: user.pts,
              avatar: user.avatar
            }
          ]
        });
      });
      this.setState({ response: 1 });
    });
    animate.set(this.container, { autoAlpha: 0 });
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
    if (!localStorage.getItem('token')) {
      return (
        <div>
          <h1>You need to login, sending you to the login page!</h1>
          <Redirect to="/login" />
        </div>
      );
    } else {
      if (this.state.response) {
        return (
          <section className={classnames('Leaderboard', this.props.className)} ref={el => (this.container = el)}>
            <div className="holder">
              <div className="leaderboardDisplay">
                <h1>
                  <i className="trophy icon" />
                  Leaderboard
                </h1>
                <ol>
                  <UserScore data={this.state} />
                </ol>
              </div>
            </div>
          </section>
        );
      } else {
        return <LoadScreen />;
      }
    }
  }
}

Leaderboard.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

Leaderboard.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Leaderboard));
