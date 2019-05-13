import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BaseLink } from '@jam3/react-ui';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import './Picks.scss';

import Transition from '../PagesTransitionWrapper';
import animate from '../../util/gsap-animate';

class Picks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    return (
      <section className={classnames('Picks', this.props.className)} ref={el => (this.container = el)}>
        <h1>Picks</h1>
        <BaseLink link="/">Home</BaseLink>
      </section>
    );
  }
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
