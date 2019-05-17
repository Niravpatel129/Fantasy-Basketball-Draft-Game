import React, { Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Pages.scss';

import routeKeys from '../../routes/keys';
import { getTransitionDuration } from '../../data/pages-transitions';

const Landing = lazy(() => import('../../pages/Landing/Landing'));
const Picks = lazy(() => import('../../pages/Picks/Picks'));
const Results = lazy(() => import('../../pages/Results/Results'));
const Login = lazy(() => import('../../pages/Login/Login'));
const Leaderboard = lazy(() => import('../../pages/Leaderboard/Leaderboard'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound')).default;

const Pages = ({ location, ...props }) => {
  return (
    <main className={classnames('Pages', props.className)} role="main">
      <TransitionGroup component={Fragment}>
        <Transition appear key={location.pathname} timeout={getTransitionDuration(location.pathname)}>
          {state => (
            <Suspense
              fallback={
                <div className="ui segment">
                  <div className="ui active dimmer">
                    <div className="ui text loader">Loading</div>
                  </div>
                  <p />
                </div>
              }
            >
              <Switch location={location}>
                <Route exact path={routeKeys.Landing} render={() => <Landing transitionState={state} />} />
                <Route exact path={routeKeys.Picks} render={() => <Picks transitionState={state} />} />
                <Route exact path={routeKeys.Results} render={() => <Results transitionState={state} />} />
                <Route exact path={routeKeys.Leaderboard} render={() => <Leaderboard transitionState={state} />} />
                <Route exact path={routeKeys.Login} render={() => <Login transitionState={state} />} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          )}
        </Transition>
      </TransitionGroup>
    </main>
  );
};

Pages.propTypes = checkProps({
  className: PropTypes.string
});

Pages.defaultProps = {};

export default withRouter(Pages);
