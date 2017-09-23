import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRuns } from '../store';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import  Run from './Run';
import { Button, Card, Header, Image, Grid } from 'semantic-ui-react';


class BrowseRuns extends Component {
  componentDidMount() {
     this.props.loadRuns();
  }

  renderRuns() {
    return _.map(_.filter(this.props.runs,'city', 'New York City'), run=>{
    //return _.map(this.props.patients, patient=>{
      return <Run key={run.id} />
    });
  }

  render() {
    return (
      <div>
        <Header as='h3' textAlign='center'>Runs</Header>
        <Card.Group itemsPerRow='2'>
          {this.renderRuns()}
        </Card.Group>
      </div>
    );
  }
}
function mapStatetoProps(state){
  return {
    runs: state.runs,
    city: state.user.profile.prefCity
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
export default connect(mapStatetoProps, mapDispatchToProps)(BrowseRuns);
