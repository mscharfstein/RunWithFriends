import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';

class Run extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let yourRun = true
    let header = ''
    let runParticipants = ''
    let partner = {}

    if (this.props.profileId === this.props.run.profileId) {
      partner = this.props.run.partner
      runParticipants = `Partner: ${partner.firstName} ${partner.lastName}`
      header = `Run with ${partner.firstName} on ${new Date(this.props.run.date).toDateString()}`
    }

    else {
      yourRun = false
      const person1 = this.props.run.profile
      const person2 = this.props.run.partner

      runParticipants = `Participants: ${person1.firstName} ${person1.lastName} and ${person2.firstName} ${person2.lastName}`
      header = `Upcoming Run in ${this.props.run.neighborhood} on ${new Date(this.props.run.date).toDateString()}`
    }

    return (
        <Card fluid className='patient-card'>
          <Card.Content>
            <Card.Header>
              <Icon> <img src='/favicon.ico' width="25px"/> </Icon> {header}
            </Card.Header>
            <Card.Description>
              <div className='text right'>
                {runParticipants}
              </div>
              <div className='text right'>
                Neighborhood: {this.props.run.neighborhood}
              </div>
              <div className='text right'>
                Distance: {this.props.run.dist} miles
              </div>
              <div className='text right'>
                Speed: {this.props.run.speed} minutes per mile
              </div>
              {
                this.props.run.rating && yourRun &&
                <div className='text right'>
                  Your Rating: {this.props.run.rating} stars
                </div>
              }
              {
                !yourRun &&
                <div className='join-run'>
                  <Button color="green">+</Button>
                </div>
              }
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}


export default Run;
