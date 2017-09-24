import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest, createRun, deleteRequest, setIncomingReq, text} from '../store'

class RateRun extends Component {
  constructor(props) {
    super(props);
    this.getNeighborhoodDropdown = this.getNeighborhoodDropdown.bind(this);

  }

  render() {
    let partner = {}
    if (this.props.requester.profileId === this.props.run.profileId) partner = this.props.run.partner
    else partner = this.props.run.profile

    return (
      <div className="container fluid">
        Tell us how your run with {partner.firstName + ' ' + partner.lastName} went!
        <br>
        </br>
        <Form onSubmit={this.props.handleSubmit}>Edit run details:
          <Form.Field control={Inpur} label="Neighborhood" defaultValue={this.props.run.neighborhood} />
          <Form.Field control={Input} label="Actual Distance (miles)" defaultValue={this.props.run.dist} />
          <Form.Field control={Input} label="Actual Speed (min per mile)" defaultValue={this.props.run.speed} />
          <Form.Field control={Input} label="Rating" placeholder="Great" options={[{key: "Great", value: "Great", text: "Great"},{key: "Good", value: "Good", text: "Good"},{key: "Fine", value: "Fine", text: "Fine"},{key: "Poor", value: "Poor", text: "Poor"}]} />
        </Form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    buddies: state.buddies,
    requester: state.user,
    neighborhoods: state.neighborhoods
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data) {
      // update upcoming run to make it completed instead of upcoming (backend, and remove from store)

      // update run with new entries
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(RateRun)

