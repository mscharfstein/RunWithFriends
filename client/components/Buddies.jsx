import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, Header, Container } from 'semantic-ui-react';

import User from './User.jsx';

class Buddies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      anyBuddies: true
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.buddies !== nextProps.buddies) this.setState({ anyBuddies: !!nextProps.buddies.length })
  }

  renderBuddies() {
    return _.map(_.filter(this.props.buddies), buddy => {
      return <User key={buddy.id} buddy={buddy} />
    });
  }

  render() {
    return (
      <Container fluid style={{ padding: '1em 2em' }}>
        {!this.state.anyBuddies && !this.props.buddies.length &&
          <div>
            <Header as="h2" textAlign="center">Browse Possible Running Buddies:</Header>
            <br />
            <Header as="h4" textAlign="center">No one matches your criteria. Try requesting buddies for a different run.</Header>
          </div>
        }
        {!!this.props.buddies.length &&
          <div>
            <Header as="h2" textAlign="center">Browse Possible Running Buddies:</Header>
            <Card.Group itemsPerRow="3">
              {this.renderBuddies()}
            </Card.Group>
          </div>
        }
      </Container>
    );
  }
}

function mapStatetoProps(state) {
  return {
    buddies: state.buddies
  }
}

export default connect(mapStatetoProps)(Buddies);
