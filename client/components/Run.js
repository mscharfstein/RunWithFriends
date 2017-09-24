import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Card, Dropdown, Grid, Icon, Image, Label, List, Statistic} from 'semantic-ui-react'
import _ from 'lodash';

class Run extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props', this.props)
    let partner = {}
    if (this.props.profileId === this.props.run.profileId) partner = this.props.run.partner
    else partner = this.props.run.profile

    return (
        <Card fluid className='patient-card'>
          <Card.Content>
            <Card.Header>
              <Icon> <img src='/favicon.ico' width="25px"/> </Icon> Run with {partner.firstName} on {new Date(this.props.run.date).toDateString()}
            </Card.Header>
            <Card.Description>
              <div className='text right'>
                Partner: {`${partner.firstName} ${partner.lastName}`}
              </div>
              <div className='text right'>
                Neighborhood: {this.props.run.neighborhood}
              </div>
              <div className='text right'>
                Distance: {this.props.run.dist} miles
              </div>
              <div className='text right'>
                Speed: {this.props.run.speed} minutes per mile
              </div>
              {
                this.props.run.rating &&
                <div className='text right'>
                  Your Rating: {this.props.run.rating} stars
                </div>
              }
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}


export default Run;
