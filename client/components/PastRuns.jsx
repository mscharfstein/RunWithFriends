import React, { Component } from 'react';
import { connect } from 'react-redux';

import  Run from './Run';

import { Card, Header } from 'semantic-ui-react';

class PastRuns extends Component {

  render() {
    return (
      <div>
        <Header as='h2' textAlign='center'>Your Past Runs</Header>

        {!!this.props.pastRuns.length &&
        <Card.Group itemsPerRow='2'>
          {this.props.pastRuns.map(run => {
            return <Run key={run.id} run={run} profileId={this.props.user.profileId} yourRun={true}/>
          })}
        </Card.Group>
        }
        {
          !this.props.pastRuns.length && <h3> You haven't gone on any runs yet. Request a running buddy to experience the joy of running with friends! </h3>
        }
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
    pastRuns: state.pastRuns,
    user: state.user
  }
}

export default connect(mapStatetoProps)(PastRuns)
