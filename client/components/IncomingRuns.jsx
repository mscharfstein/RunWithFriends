import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest, createRun, deleteRequest, setIncomingReq} from '../store'

class IncomingRuns extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props)
    return (
      <div className="container fluid">
        {this.props.run.profile.firstName + ' ' + this.props.run.profile.lastName} wants to run with you!
        <br>
        </br>
        <div>
        Run details:
        </div>
        <br>
        </br>
        <div>
        Neighborhood: {this.props.run.neighborhood}
        </div>
        <div>
        Desired Distance: {this.props.run.dist} miles
        </div>
        <div>
        Desired Speed: {this.props.run.speed} minutes per mile
        </div>
        <div>
        Desired Time: {new Date(this.props.run.date).toDateString()}, {this.props.run.time}
        </div>
        <Button onClick={(evt)=>this.props.handleAccept(evt, this.props.run)}>Accept!</Button>
        <Button onClick={this.props.handleDecline}>Sorry, can't make it</Button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    buddies: state.buddies,
    requester: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleAccept(evt, run) {
      dispatch(deleteRequest(run.id))
      dispatch(setIncomingReq([]))
      dispatch(createRun(run))
      history.push('/home')
    },
    handleDecline(evt) {
      dispatch(deleteRequest(run))
      dispatch(setIncomingReq([]))
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(IncomingRuns)

