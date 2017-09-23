import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Container, Menu} from 'semantic-ui-react'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {Main, RequestBuddyForm, BrowseRuns} from './index'
/**
 * COMPONENT
 */

export class UserHome extends Component {

  render() {
    return (
      <Container fluid>
      <Grid columns={2} divided padded='horizontally' relaxed className='main-grid'>
        <Grid.Column width={10} className='patient-column'>

        </Grid.Column>
        <Grid.Column width={6} className='nurse-column'>
          <RequestBuddyForm />
        </Grid.Column>
      </Grid>
    </Container>
    )
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
