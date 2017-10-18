import React, {Component} from 'react'
import ScrollingModal from './ScrollingModal.jsx'
import CreateProfileForm from './CreateProfileForm.jsx'

/**
 * COMPONENT
 */
export default class CreateProfile extends Component {
  render() {
    return (
      <ScrollingModal header="Create Your Profile!" content={<CreateProfileForm />} btnMessage="Get Running!"/>
    )
  }
}
