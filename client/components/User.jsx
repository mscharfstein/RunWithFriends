import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';
import history from '../history'
import {addBuddyToRunRequest} from '../store'

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props)
    return (
        <Card fluid className='patient-card'>
          <Card.Content>
            <Card.Header>
              <Icon name='user' /> {this.props.buddy.firstName + ' ' + this.props.buddy.lastName}
            </Card.Header>
            <Card.Description>
              <List size='tiny'>
                Phone Number: {this.props.buddy.phone}
              </List>
              <div className='text right'>
                Speed: {this.props.buddy.prefSpeed} minutes per mile
              </div>
              <div className='text right'>
                Distance: {this.props.buddy.prefDist} miles
              </div>
             <div className='request-run-button'>
                <Button size='mini' color='green' onClick={(evt) => this.props.chooseBuddy(evt, this.props.requestedRun, this.props.buddy)}>Join Me?</Button>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

const mapState = (state) => {
  return {
    buddies: state.buddies,
    requestedRun: state.requestedRun,
    requester: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    chooseBuddy(evt, run, buddy) {
      // pass in only what needed
      dispatch(addBuddyToRunRequest(run.id, buddy.id, buddy.phone))
      history.push('/home')
    }
  }
}

export default connect(mapState, mapDispatch)(User)

