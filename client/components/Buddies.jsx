import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRuns } from '../store';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import  User from './User.jsx';
import { Button, Card, Header, Image, Grid } from 'semantic-ui-react';


class Buddies extends Component {

  renderBuddies() {
    console.log('rendering buddies', this.props.buddies)
    return _.map(_.filter(this.props.buddies), buddy=>{
    //return _.map(this.props.patients, patient=>{
      return <User key={buddy.id} buddy={buddy}/>
    });
  }

  render() {
    return (
      <div>
        <Header as='h3' textAlign='center'>Your Possible Running Buddies!</Header>
        <Card.Group itemsPerRow='3'>
          {this.renderBuddies()}
        </Card.Group>
      </div>
    );
  }
}

function mapStatetoProps(state){
  return {
    buddies: state.buddies
  }
}

//wires up fetchNurses to be a prop as action creator for component
export default connect(mapStatetoProps)(Buddies);
