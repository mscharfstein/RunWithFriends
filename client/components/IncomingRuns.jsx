import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import { createRun, deleteRequest, setIncomingReq, text } from '../store'
import { Icon } from 'semantic-ui-react'

class IncomingRuns extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3> <Icon> <img src='/favicon.ico' width="25px" /> </Icon> {this.props.run.profile.firstName + ' ' + this.props.run.profile.lastName} wants to run with you!</h3>
        <h4>Run details:</h4>
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
        <br>
        </br>
        <Button className="btn" color="green" size="small" onClick={(evt) => this.props.handleAccept(evt, this.props.run, this.props.user.profile)}>Accept!</Button>
        <Button className="btn" color="grey" size="small" onClick={(evt) => this.props.handleDecline(evt, this.props.run, this.props.user.profile)}>Sorry, can't make it</Button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    buddies: state.buddies,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleAccept(evt, run, profile) {
      dispatch(deleteRequest(run.id))
      dispatch(setIncomingReq([]))

      run.currentUserId = profile.id
      dispatch(createRun(run))
      dispatch(text(profile.phone, `${profile.firstName} ${profile.lastName} has accepted your run request. Your run is on ${run.date} at ${run.time} in ${run.neighborhood}. Enjoy your run with friends!`))
      history.push('/home')
    },
    handleDecline(evt, run, profile) {
      dispatch(deleteRequest(run.id))
      dispatch(setIncomingReq([]))
      dispatch(text(run.profile.phone, `Sorry, ${profile.name} can't join your run on ${run.date}. Log back onto Run With Friends to request another running buddy!`))
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(IncomingRuns)

