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
import Form from '../components/Form';
import Text from '../components/Text';

class TopicsScreen extends Component {

  constructor(props) {
    super(props); 
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics());
  }

  render() {
    const SmartForm = connect(state => state, topicsActions)(Form);
    if (!this.props.topicsByUrl) return this.renderLoading();
    return (
      <div className="TopicsScreen">
        <h2>Add new form </h2>
        <SmartForm />
          <Text
            name="author"
            // validate={['required']}
            placeholder="Scrivi il tuo nome qui"
            label="Nome e cognome"/>
          <Text
            name="title"
            // validate={['required']}
            placeholder="Scrivi il titolo del talk"
            label="Titolo"/>
          <Text 
            name="description"
            // validate={['required']}
            placeholder="Scrivi una descrizione per il corso"
            label="Descrizione"/>

        <h3>Here are the polls</h3>
        <ListView
          rowsIdArray={this.props.topicsUrlArray}
          rowsById={this.props.topicsByUrl}
          renderRow={this.renderRow} />
        {!this.props.canFinalizeSelection ? false :
          <button className="NextScreen" onClick={this.onNextScreenClick} />
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );  
  }

  renderRow(topicUrl, topic) {
    const selected = this.props.selectedTopicsByUrl[topicUrl];
    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.onRowClick}
        selected={selected}>
        <h3>{topic.title}</h3>
        <h4>{topic.author}</h4>
        <p>{topic.description}</p>
        <p>Rating : {topic.rating}</p>
      </ListRow>
    )
  }

  onRowClick(topicUrl) {
    this.props.dispatch(topicsActions.selectTopic(topicUrl));
  }

  onNextScreenClick() {
    this.props.dispatch(topicsActions.finalizeTopicSelection());
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [topicsByUrl, topicsUrlArray] = topicsSelectors.getTopics(state);
  return {
    topicsByUrl,
    topicsUrlArray,
    selectedTopicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
  };
}

export default connect(mapStateToProps)(TopicsScreen);
