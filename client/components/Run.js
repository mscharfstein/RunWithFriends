import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest, joinUpcomingRun, text} from '../store'

class Run extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let header = ''
    let runParticipants = ''
    let yourRunDetails = {}

    const partners = this.props.run.profiles.filter(profile => {
      return +profile.id !== +this.props.profileId
    })

    const partnersNames = partners.map(partner => {
      return `${partner.firstName} ${partner.lastName}`
    })

    // change this to loop through the profiles in the run
    if (this.props.yourRun) {

      runParticipants = `Partner(s): ${partnersNames.join(" & ")}`
      header = `Run with ${partnersNames.join(" & ")} on ${new Date(this.props.run.date).toDateString()}`
      const yourRunProfile = this.props.run.profiles.filter(profile => {
        return +profile.id === +this.props.profileId
      })
      yourRunDetails = yourRunProfile[0].runUserDetails
    }

    // change this to loop through the profiles on the run
    else {

      runParticipants = `Participants: ${partnersNames.join(" & ")}`

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
                <div>
                  <Button className='right-btn' size='mini' onClick={(evt, data)=> this.props.handleJoinRun(evt, data, partners, this.props.run, this.props.profile)} color="green">+</Button>
                </div>
              }
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleJoinRun(evt, data, partners, run, profile) {
      dispatch(joinUpcomingRun(run.id, profile.id))

      partners.map(partner => {
        dispatch(text(partner.phone, `${profile.firstName} ${profile.lastName} will join your run on ${new Date(run.date).toDateString()}!`))
      })

      history.push('/home')
    }
  }
}

export default connect(null, mapDispatch)(Run)

