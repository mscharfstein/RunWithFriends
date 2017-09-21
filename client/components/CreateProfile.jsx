import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import CreateProfileForm from './CreateProfileForm.jsx'

/**
 * COMPONENT
 */
export class CreateProfile extends Component {

  constructor() {
    super()
    this.state = {
      open: true
    }
    this.close = this.close.bind(this)
  }

  render() {
    return (
      <Modal open={this.state.open} closeIcon>
      <Modal.Header>Create Your Profile!</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />

        <CreateProfileForm />

          {_.times(8, i => (
            <Image
              key={i}
              src='/assets/images/wireframe/paragraph.png'
              style={{ paddingBottom: 5 }}
            />
          ))}
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={this.close}>
          Get Running! <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }

  close() {
    this.setState({open: false})
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(CreateProfile)


