import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, Header } from 'semantic-ui-react';

import Run from './Run';
import { fetchAllRuns } from '../store'

class BrowseRuns extends Component {
  render() {
    return (
      <div>
        <Header as='h2' textAlign='center'>All Upcoming Runs</Header>

        {!!this.props.allRuns.length &&
          <Card.Group itemsPerRow='2'>
            {_.map(this.props.allRuns, run => {
              return <Run key={run.id} run={run} profile={this.props.user.profile} yourRun={false} />
            })}
          </Card.Group>
        }
        {
          !this.props.allRuns.length &&
          <h3> There are no currently scheduled runs. Request a running buddy to experience the joy of running with friends! </h3>
        }
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    allRuns: state.allRuns,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllRuns() {
      dispatch(fetchAllRuns()) // get all runs besides your own
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(BrowseRuns);
