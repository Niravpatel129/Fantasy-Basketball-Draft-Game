import routeKeys from '../routes/keys';
import logo from '../assets/images/jam3-logo.png';

export default {
  logoSrc: logo,
  links: [
    {
      text: 'Picks',
      path: routeKeys.Picks
    },
    {
      text: 'Results',
      path: routeKeys.Results
    },
    {
      text: 'Leaderboard',
      path: routeKeys.Leaderboard
    }
  ]
};
