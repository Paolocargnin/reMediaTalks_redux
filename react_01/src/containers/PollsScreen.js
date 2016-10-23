import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as pollsActions from '../store/polls/actions';
import * as pollsSelectors from '../store/polls/reducer';

// import './PollsScreen.css';

class PollsScreen extends Component {
  render() {
    return (
        <h2>Where are my polls?</h2>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
 return {
    // rowsById: PollsSelectors.getPolls(state),
    polls: pollsSelectors.getPolls(state)
  };
}

export default connect(mapStateToProps)(PollsScreen);