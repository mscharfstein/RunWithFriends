import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import history from '../history'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import _ from 'lodash'

/**
 * COMPONENT
 */
export default class ScrollingModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.close = this.close.bind(this)
  }

  render() {
    const {header, content, btnMessage} = this.props;
    return (
      <Modal open={this.state.open} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src='/assets/images/wireframe/image.png'
          wrapped
        />

        {content}

          {_.times(8, i => (
            <Image
              key={i}
              src='/assets/images/wireframe/paragraph.png'
              style={{ paddingBottom: 5 }}
            />
          ))}
      </Modal.Content>
    </Modal>
    )
  }

  close() {
    this.setState({open: false})
    history.push('/home')
  }
}



