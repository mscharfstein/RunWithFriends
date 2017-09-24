import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import  Run from './Run';
import { Button, Card, Header, Image, Grid } from 'semantic-ui-react';
import {fetchAllRuns} from '../store'

class BrowseRuns extends Component {

  componentDidMount() {
    this.props.loadAllRuns(this.props.user.profileId)
  }

  render() {
    return (
      <div>
        <Header as='h3' textAlign='center'>All Upcoming Runs</Header>
        {!!this.props.allRuns.length &&
        <Card.Group itemsPerRow='2'>
          {_.map(this.props.allRuns, run => {
            // change because currently run only shows name that is not you, in this case show both names
            return <Run key={run.id} run={run}/>
          })}
        </Card.Group>
        }
        {
          !this.props.pastRuns.length && "There are no currently scheduled runs. Request a running buddy to experience the joy of running with friends!"
        }
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
    allRuns: state.allRuns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllRuns() {
      dispatch(fetchAllRuns(profileId)) // get all runs besides your own
    }
  }
}


//wires up fetchNurses to be a prop as action creator for component
export default connect(mapStatetoProps, mapDispatchToProps)(BrowseRuns);
