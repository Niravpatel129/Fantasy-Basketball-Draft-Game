import axios from 'axios';

export async function gamesApi(start, end) {
  return await axios.get('https://www.balldontlie.io/api/v1/games?start_date=' + start + '&end_date=' + end);
}
