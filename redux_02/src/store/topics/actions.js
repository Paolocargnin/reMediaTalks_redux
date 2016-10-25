// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer
import _ from 'lodash';
import * as types from './actionTypes';
import pollService from '../../services/pollService';
import * as topicsSelectors from './reducer';

export function fetchTopics() {
  console.log('frccia')
  return async(dispatch, getState) => {
    try {
      const topicsArray = await pollService.getTopics();
      const topicsById = _.keyBy(topicsArray, (topic) => topic.id);
      dispatch({ type: types.TOPICS_FETCHED, topicsById });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteTopic(topicId){
  return async(dispatch, getState) => {
    try {
      const deleteTopic = await pollService.deleteTopic(topicId);
      if (deleteTopic.length === 0){
        fetchTopics();
        dispatch({ type: types.DELETE_TOPIC, topicId });
      }
    } catch (error) {
      console.error(error);
    }
  };

}
export function upvoteTopic(topicId){
  return async(dispatch, getState) => {
    try {
      const upvoteTopic = await pollService.upvoteTopic(topicId);
      if (upvoteTopic.length === 0){
        dispatch({ type: types.UPDATE_TOPIC, topicId });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function addPoll(poll) {
  return async(dispatch, getState) => {
    try {
      const pollId = await pollService.createNewPoll(poll);
      if (pollId === parseInt(pollId) ){
        dispatch( { type: types.ADD_POLL, poll: poll } );
      }
    } catch (error) {
      console.error(error);
    }
  }
}


export function resetForm() {
  return dispatch => dispatch({
    type: types.FORM_RESET
  });
}


export function finalizeTopicSelection() {
  return({ type: types.TOPIC_SELECTION_FINALIZED });
}
