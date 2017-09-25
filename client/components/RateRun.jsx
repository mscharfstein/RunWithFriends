import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic, Form, Input} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest, createRun, deleteRequest, setIncomingReq, text, markAsComplete} from '../store'

class RateRun extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let header = ''
    let runParticipants = ''

    const partners = this.props.run.profiles.filter(profile => {
      return +profile.id !== +this.props.profileId
    })

    const partnersNames = partners.map(partner => {
      return `${partner.firstName} ${partner.lastName}`
    })

    runParticipants = `Partner(s): ${partnersNames.join(" & ")}`
    header = `Tell us how your ${this.props.run.dist} mile run with ${partnersNames.join(" & ")} on ${new Date(this.props.run.date).toDateString()} in ${this.props.run.neighborhood} went!`

    return (
      <div className="container fluid">
        {header}
        <br>
        </br>
        <Form onSubmit={(evt, data)=>this.props.handleSubmit(evt, data, this.props.run.id)}>
          <Form.Field control={Dropdown} label="Rating" placeholder="Great" options={[{key: "Great", value: "Great", text: "Great"},{key: "Good", value: "Good", text: "Good"},{key: "Fine", value: "Fine", text: "Fine"},{key: "Poor", value: "Poor", text: "Poor"}]} />

          <Form.Field>
          <Button primary type="submit">
          Submit<Icon name='right chevron' />
          </Button>
          </Form.Field>
          </Form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    upcomingRun: state.upcomingRun
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data, runId) {
      // update upcoming run to make it completed instead of upcoming (backend, and remove from store)
      dispatch(markAsComplete(runId))

      // update run with new entries
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(RateRun)

