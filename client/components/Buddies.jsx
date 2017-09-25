import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRuns } from '../store';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import  User from './User.jsx';
import { Button, Card, Header, Image, Grid, Container } from 'semantic-ui-react';


class Buddies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anyBuddies: true
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.buddies !== nextProps.buddies) this.setState({anyBuddies: !!nextProps.buddies.length})
  }

  renderBuddies() {
    return _.map(_.filter(this.props.buddies), buddy=>{
      return <User key={buddy.id} buddy={buddy}/>
    });
  }

  render() {
    return (
      <Container fluid style={{padding: "1em 2em"}}>
      {!this.state.anyBuddies && !this.props.buddies.length &&
        <div>
        <Header as='h2' textAlign='center'>Browse Possible Running Buddies:</Header>
        <br>
        </br>
        <Header as='h4' textAlign='center'>No one matches your criteria. Try requesting buddies for a different run.</Header>
        </div>
      }
      {!!this.props.buddies.length &&
        <div>
        <Header as='h2' textAlign='center'>Browse Possible Running Buddies:</Header>
        <Card.Group itemsPerRow='3'>
          {this.renderBuddies()}
        </Card.Group>
        </div>
      }
      </Container>
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
