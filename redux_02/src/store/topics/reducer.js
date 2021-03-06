// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption byIdews

import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  topicsById: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOPICS_FETCHED:
      return state.merge({
        topicsById:  action.topicsById
      });
    case types.TOPICS_SELECTED:
      return state.merge({
        selectedTopicUrls: action.selectedTopicUrls
      });
    case types.TOPIC_SELECTION_FINALIZED:
      return state.merge({
        selectionFinalized: true
      });
    case types.ADD_POLL:
      return state.merge({
        poll: action.poll
      });
    case types.UPDATE_TOPIC:
      return state.merge({
        topicId: action.topicId
      });
    case types.DELETE_TOPIC:
      return state.merge({
        topicId: action.topicId
      });
    default:
      return state;
  }
}

// selectors

export function getTopics(state) {
  const topicsById = state.topics.topicsById;
  const topicsUrlArray = _.keys(topicsById);
  return [topicsById, topicsUrlArray];
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls;
}

// export function getSelectedTopicsById(state) {
//   return _.mapValues(_.keyByIdate.topics.selectedTopicIds, (topicId) => state.topics.topicsById[topicId] );
// }

export function isTopicSelectionValid(state) {
  return state.topics.selectedTopicUrls.length === 3;
}

export function isTopicSelectionFinalized(state) {
  return state.topics.selectionFinalized;
}
