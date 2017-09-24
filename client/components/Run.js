import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';

class Run extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let header = ''
    let runParticipants = ''
    let yourRunDetails = {}
    // change this to loop through the profiles in the run
    if (this.props.yourRun) {
      console.log(this.props.run)
      const partners = this.props.run.profiles.map(profile => {
        if (+profile.id !== +this.props.profileId)
        return `${profile.firstName} ${profile.lastName}`
        return ''
      })
      runParticipants = `Partner(s): ${partners.join("& ")}`
      header = `Run with ${partners.join(" & ")} on ${new Date(this.props.run.date).toDateString()}`
      const yourRunProfile = this.props.run.profiles.filter(profile => {
        return +profile.id === +this.props.profileId
      })
      console.log('yourrunprofile', yourRunProfile)
      yourRunDetails = yourRunProfile[0].runUserDetails
      console.log('yourRunDetails', yourRunDetails)
    }

    // change this to loop through the profiles on the run
    else {
      const participants = this.props.run.profiles.map(profile => {
        return `${profile.firstName} ${profile.lastName}`
      })

      runParticipants = `Participants: ${participants.join("& ")}`
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
                // this is definitely wrong!!!!
                this.props.yourRun &&
                <div className='text right'>
                  Your Rating: {yourRunDetails.rating} stars
                </div>
              }
              {
                !this.props.yourRun &&
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
