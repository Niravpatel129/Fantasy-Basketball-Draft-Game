import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import './Login.scss';
import Transition from '../PagesTransitionWrapper';
import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';
import InfoBox from '../../components/InfoBox/InfoBox';
import LoginPrompt from '../../components/LoginPrompt/LoginPrompt';
import GoogleAuth from '../../components/GoogleAuth';
let hash = '';

class Login extends React.PureComponent {
  state = {
    token: ''
  };

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setLandingLoaded(true);
    }
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

  async authUser() {
    hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function(initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = '';
    console.log(hash);

    // Set token
    let _token = hash.access_token;

    const authEndpoint = 'https://slack.com/oauth/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = '2222937506.634323100293';
    const redirectUri = 'http://localhost:3000/login';
    const scopes = ['identity.basic'];

    // If there is no token, redirect to Slack authorization
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`;
    }
  }

  onClickEvent = () => {
    this.authUser();
  };

  render() {
    return (
      <section className="Login">
        <InfoBox />
        <LoginPrompt />
        <br />
        <GoogleAuth />
      </section>
    );
  }
}

Login.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setLandingLoaded: PropTypes.func
});

Login.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.landingLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLandingLoaded: val => dispatch(setLandingLoaded(val))
  };
};

Login.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Login));
