import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';

class Run extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colors = ['red', 'blue']
    return (
        <Card fluid className='patient-card'>
          <Card.Content>
            <Card.Header>
              <Icon name='hotel' /> Yo
              <div className='right floated acuity-rating'>
                Hi
              </div>
            </Card.Header>
            <Card.Description>
              <List size='tiny'>
                Hello
              </List>
              <div className='text right'>
                Hey there
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}


export default Run;
