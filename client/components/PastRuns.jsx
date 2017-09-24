import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import  Run from './Run';
import { Button, Card, Header, Image, Grid } from 'semantic-ui-react';


class PastRuns extends Component {

  render() {
    return (
      <div>
        <Header as='h3' textAlign='center'>Your Past Runs</Header>
        {!!this.props.pastRuns.length &&
        <Card.Group itemsPerRow='2'>
          {_.map(this.props.pastRuns, run => {
            return <Run key={run.id} run={run} profileId={this.props.user.profileId}/>
          })}
        </Card.Group>
        }
        {
          !this.props.pastRuns.length && "You haven't gone on any runs yet. Request a running buddy to experience the joy of running with friends!"
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

//wires up fetchNurses to be a prop as action creator for component
export default connect(mapStatetoProps)(PastRuns);
