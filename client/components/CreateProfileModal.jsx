import _ from 'lodash'
import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import CreateProfileForm from './CreateProfileForm.jsx'

const CreateProfileModal = () => (
  <Modal defaultOpen closeIcon>
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
      <Button primary>
        Create <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default CreateProfileModal
