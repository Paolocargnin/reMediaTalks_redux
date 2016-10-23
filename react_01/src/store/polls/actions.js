import _ from 'lodash';
import * as types from './actionTypes';
import pollService from '../../services/PollsService';

export function fetchPolls() {
  return async(dispatch, getState) => {
    try {
      const pollsArray = await pollService.getPolls();
      const pollsById = _.keyBy( pollsArray, (poll) => poll.id);
      dispatch({ type: types.POLLS_FETCHED, pollsById });
    } catch (error) {
      console.error(error);
    }
  };
}