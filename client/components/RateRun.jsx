import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic, Form, Input} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest, createRun, deleteRequest, setIncomingReq, text, markAsComplete} from '../store'

class RateRun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '4'
    }

    this.handleChangeRating = this.handleChangeRating.bind(this);
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
        <br />
        <Form onSubmit={(evt, data)=>this.props.handleSubmit(evt, data, this.props.run.id, this.props.profileId, this.state.rating)}>
        <br />

        Provide number of stars:
          <Form.Field control={Dropdown} placeholder="5" value={this.state.rating} options={[{key: "1", value: "1", text: "1"},{key: "2", value: "2", text: "2"},{key: "3", value: "3", text: "3"},{key: "4", value: "4", text: "4"},{key: "5", value: "5", text: "5"}]} onChange={this.handleChangeRating}/>

          <Form.Field>
          <Button size='small' className='right-btn' primary type="submit">
          Submit<Icon name='right chevron' />
          </Button>
          </Form.Field>
          </Form>
      </div>
    );
  }

  handleChangeRating(evt) {
    this.setState({rating: evt.target.value})
  }
}

const mapState = (state) => {
  return {
    upcomingRun: state.upcomingRun
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data, runId, profileId, rating) {

      // update upcoming run to make it completed instead of upcoming
      dispatch(markAsComplete(runId, profileId, rating))

      // update run with new entries
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(RateRun)

