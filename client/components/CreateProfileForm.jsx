import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

export class CreateProfileForm extends Component {
  render() {
    <Form onSubmit={this.props.handleSubmit}>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' />
      </Form.Field>
      <Form.Field>
        <label>City</label>
        <select>
          <option>New York City</option>
          <option>Chicago</option>
        </select>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  }
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit: {

    }
  }
}

export default connect(mapState, mapDispatch)(CreateProfileForm)
