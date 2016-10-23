import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  polls: undefined,
  selectedPolls: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.POLLS_FETCHED:
      return state.merge({
        polls: action.polls
      });
    default:
      return state;
  }
}


// selectors

export function getPolls(state) {
  console.log(state.polls);
  return state.polls.polls;
}

export function getTopicsUrlArray(state) {
  return _.keys(state.topics.topicsByUrl);
}
