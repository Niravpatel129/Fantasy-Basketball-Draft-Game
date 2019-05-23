import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';
import './Landing.scss';
import { TweenMax, Power3 } from 'gsap';
import Transition from '../PagesTransitionWrapper';
import { setLandingLoaded } from '../../redux/modules/landing';
import animate from '../../util/gsap-animate';
import Titletext from '../../components/Titletext/Titletext';
import Arrow from '../../components/Arrow/Arrow';
import GameButton from '../../components/GameButton/GameButton';

class Landing extends React.PureComponent {
  componentDidMount() {
    TweenMax.staggerTo('#arrow', 1, { y: +40, repeat: -1, yoyo: true, ease: Power3.easeOut }, 1);

    TweenMax.to('#myID', 1, {
      y: +40,
      glowFilter: { color: 0x91e600, alpha: 1, blurX: 50, blurY: 50 },
      repeat: -1,
      ease: Power3.easeOut,
      yoyo: true
    });

    TweenMax.to('#gamebutton', 1, {
      scaleX: 1.01,
      scaleY: 1.01,
      glowFilter: { color: 0x91e600, alpha: 2, blurX: 50, blurY: 50 },
      repeat: -1,
      yoyo: true
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    animate.set(this.container, { autoAlpha: 0 });
    this.onAppear();

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setLandingLoaded(true);
    }
  }
  x;
  onAppear = () => {
    console.log('this is called');
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
      <section className="Landing-resources">
        <Titletext title="FANTASY BASKETBALL PICKER" />
        <TransitionGroup>
          <GameButton key="game-button" id="gamebutton" />
          {/* <div id="myID">Hello!</div> */}
          <div id="">
            <Arrow id="arrow" />
            <Arrow id="arrow" />
            <Arrow id="arrow" />
          </div>
        </TransitionGroup>
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
