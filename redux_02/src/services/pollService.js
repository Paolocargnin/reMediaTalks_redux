// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const POLL_ENDPOINT = 'http://remediapollgenerator.azurewebsites.net';
var serialize = function(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
class PollService {

  async getTopics() {
    const url = `${POLL_ENDPOINT}/api/polls`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`);
    }
    const children = await response.json();
    if (!children) {
      throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
    }
    const sortedBySubscribers = _.map(_.orderBy(children, 'data.rating', 'desc'), poll => {
      return {
        title: poll.title,
        description: poll.description,
        id: poll.id,
        rating: poll.rating,
        author: poll.author,
      }
    });
    return sortedBySubscribers ; 
  }

  async createNewPoll(poll) {
    const url = `${POLL_ENDPOINT}/api/polls`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type" : 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: serialize(poll),
    });

    const pollId = await response.json();
    //controllo se la risposta è corretta
    return pollId;
    // return poll;
  }

  async deleteTopic(topicId) {
    const url = `${POLL_ENDPOINT}/api/polls/${topicId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      },
    });

    const pollId = await response.json();
    //controllo se la risposta è corretta
    return pollId;
  }

  async upvoteTopic(topicId) {
    const url = `${POLL_ENDPOINT}/api/polls/${topicId}`;
    console.log(url)
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json'
      },
    });

    const pollId = await response.json();
    //controllo se la risposta è corretta
    return pollId;
  }



  _validateUrl(url = '') {
    return url.startsWith('http') ? url : undefined;
  }

}

export default new PollService();
