// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const REDDIT_ENDPOINT = 'http://remediapollgenerator.azurewebsites.net';

class PollService {

  async getPolls() {
    const url = `${REDDIT_ENDPOINT}/api/polls`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Polls getPolls failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    const children = _.get(data, 'data');
    if (!children) {
      throw new Error(`Polls getPolls failed, polls not returned`);
    }
    return _.map(data, (poll) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      return {
        title: _.get(poll, 'data.display_name'),
        description: _.get(poll, 'data.public_description'),
        url: _.get(poll, 'data.url'),
        rating : _.get(poll, 'data.rating'),
        author: _.get(poll, 'data.author')
      }
    });
  }

}

export default new PollService();