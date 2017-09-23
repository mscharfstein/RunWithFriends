import React, {Component} from 'react'
import ScrollingModal from './ScrollingModal'
import RequestBuddyForm from './RequestBuddyForm'

/**
 * COMPONENT
 */
export default class RequestBuddy extends Component {
  render() {
    return (
      <ScrollingModal header="Input Run Details" content={<RequestBuddyForm />} btnMessage="Find Running Buddies!"/>
    )
  }
}
