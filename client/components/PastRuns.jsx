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
        {this.props.pastRuns.length &&
        <Card.Group itemsPerRow='2'>
          {_.map(this.props.pastRuns, run => {
            return <Run key={run.id} run={run}/>
          })}
        </Card.Group>
        }
        {
          this.props.pastRuns.length === 0 ? "You haven't gone on any runs yet. Request a running buddy to experience Run With Friends for the first time!" : ''
        }
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
    pastRuns: state.pastRuns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadRuns() {
      dispatch(fetchRuns())
    }
  }
}


//wires up fetchNurses to be a prop as action creator for component
export default connect(mapStatetoProps, mapDispatchToProps)(PastRuns);
