// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './TopicsScreen.css';
import * as topicsActions from '../store/topics/actions';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import Button from '../components/Button';
import AddPollForm from './AddPollForm';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class TopicsScreen extends Component {

  constructor(props) {
    super(props); 
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics());
  }

  deletePoll = (pollId) => {

  }

  handleSubmit = (values) => {
    // Do something with the form values
    this.props.dispatch(topicsActions.addPoll(values));
  }
  
  render() {
    if (!this.props.topicsById) return this.renderLoading();
    return (
      <div className="TopicsScreen">
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <h2>Add new form </h2>
            <AddPollForm onSubmit={this.handleSubmit} />
          </div>
          <div className="col-xs-12 col-sm-9">
            <h2>Active polls</h2>
            <ListView
              rowsIdArray={this.props.topicsUrlArray}
              rowsById={this.props.topicsById}
              renderRow={this.renderRow} />
          </div>
        </div>
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );  
  }

  renderRow(topicId, topic) {
    // const selected = this.props.selectedTopicsById[topicUrl];
    return (
      <ListRow
        rowId={topicId}>
        <h3>{topic.title}</h3>
        <h4>{topic.author}</h4>
        <p>{topic.description}</p>
        <p>Rating : {topic.rating}</p>
        <Button rowId={topicId} onClick={this.onRowDelete} value="Delete"></Button>
        <Button rowId={topicId} onClick={this.onRowUpvote} value="Upvote"></Button>

      </ListRow>
    )
  }

  onRowDelete(topicId) {
    this.props.dispatch(topicsActions.deleteTopic(topicId));
    this.props.dispatch(topicsActions.fetchTopics());
  }

  onRowUpvote(topicId) {
    this.props.dispatch(topicsActions.upvoteTopic(topicId));
    this.props.dispatch(topicsActions.fetchTopics());
  }


}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [topicsById, topicsUrlArray] = topicsSelectors.getTopics(state);
  return {
    topicsById,
    topicsUrlArray,
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(TopicsScreen);
