import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import './Landing.scss';
import Transition from '../PagesTransitionWrapper';
import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';

class Landing extends React.PureComponent {
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

  onSubmit = event => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  render() {
    return (
      <section className="Landing-resources">
        <h1>Landing Page</h1>
      </section>
    );
  }
}

Landing.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setLandingLoaded: PropTypes.func
});

Landing.defaultProps = {};

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

Landing.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Landing));
