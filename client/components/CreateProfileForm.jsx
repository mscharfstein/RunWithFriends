import React, { Component } from 'react'
import { Button, Checkbox, Form, Dropdown, Input, TextArea, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateProfile } from '../store'

export class CreateProfileForm extends Component {
  constructor(props) {
    super(props)
    // maintain local state for input while writing
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      city: '',
      neighborhoods: [],
      prefNeighborhoods: [],
      prefDist: '',
      prefSpeed: '',
      prefWeekdayTime: [],
      prefWeekendTime: []
    }
    this.getCityDropdown = this.getCityDropdown.bind(this);
    this.getMilesDropdown = this.getMilesDropdown.bind(this);
    this.getSpeedDropdown = this.getSpeedDropdown.bind(this);
    this.getNeighborhoodDropdown = this.getNeighborhoodDropdown.bind(this);
    this.getTimeDropdown = this.getTimeDropdown.bind(this);

    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeNeigh = this.handleChangeNeigh.bind(this);
    this.handleChangeMiles = this.handleChangeMiles.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.handleChangeWeekdayTimes = this.handleChangeWeekdayTimes.bind(this);
    this.handleChangeWeekendTimes = this.handleChangeWeekendTimes.bind(this);
  }

  render() {
    const city_dropdown = this.getCityDropdown()
    const neighborhood_dropdown = this.getNeighborhoodDropdown()
    const miles_dropdown = this.getMilesDropdown()
    const speed_dropdown = this.getSpeedDropdown()
    const time_dropdown = this.getTimeDropdown()

    return (
      <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state, this.props.user)}>

        <h4>Profile Information</h4>
        <Form.Field required control={Input} label='First Name' placeholder='First Name' onChange={this.handleChangeFirstName}/>
        <Form.Field required control={Input} label='Last Name' placeholder='Last Name' onChange={this.handleChangeLastName}/>
        <Form.Field control={Input} label='Age' placeholder='25' onChange={this.handleChangeAge} />
        <br>
        </br>

        <h4>Running Preferences</h4>
        <Form.Field required control={Dropdown} label="City" placeholder="Choose City" selectOnBlur={false} options={city_dropdown} onChange={this.handleChangeCity} />
        <Form.Field control={Dropdown} label="Preferred Neighborhoods" placeholder="Running Neighborhoods" fluid multiple selection placeholder="Choose Neighborhoods" selectOnBlur={false} options={neighborhood_dropdown} onChange={this.handleChangeNeigh} />
        <br>
        </br>
        <Form.Field required control={Dropdown} label="Preferred Distance (miles)" placeholder="4" selectOnBlur={false} options={miles_dropdown} onChange={this.handleChangeMiles} />
        <Form.Field required control={Dropdown} label="Preferred Speed (min per mile)" placeholder="9-10" selectOnBlur={false} options={speed_dropdown} onChange={this.handleChangeSpeed} />
        <br>
        </br>

        <h4>Time Preferences</h4>
        <Form.Field control={Dropdown} label="Weekday Times" placeholder="Choose Time of Day" selectOnBlur={false} fluid multiple selection options={time_dropdown} onChange={this.handleChangeWeekdayTimes} />
        <Form.Field control={Dropdown} label="Weekend Times" placeholder="Choose Time of Day" fluid multiple selection placeholder="Choose Time of Day" selectOnBlur={false} options={time_dropdown} onChange={this.handleChangeWeekendTimes} />
        <br>
        </br>

        <Form.Field>
        <Button primary type="submit">
        Submit<Icon name='right chevron' />

        </Button>
        </Form.Field>
      </Form>
    )
  }

  getCityDropdown() {
    return this.props.cities.map(city => {
      return {key: city.id,value: city.name,text: city.name}
    })
  }

  getNeighborhoodDropdown() {
    return this.state.neighborhoods.map(neighborhood => {
      return {
        key: neighborhood.id,
        value: neighborhood.name,
        text: neighborhood.name
      }
    })
  }

  getMilesDropdown() {
    const miles = ['1','2','3','4','5','6','7','8','9','10','10+']
    return miles.map(mile => {
      return {
        key: mile,
        value: mile,
        text: mile
      }
    })
  }

  getSpeedDropdown() {
    const speeds = ['<6','6-7','7-8','8-9','9-10','10-11','11-12','>12']
    return speeds.map(speed => {
      return {
        key: speed,
        value: speed,
        text: speed
      }
    })
  }

  getTimeDropdown() {
    const times = ['Early Morning', 'Morning', 'Mid-day', 'Afternoon', 'Evening', 'Late Night']
    return times.map(time => {
      return {
        key: time,
        value: time,
        text: time
      }
    })
  }

  handleChangeFirstName(evt, data) {
    this.setState({ firstName: data.value })
  }

  handleChangeLastName(evt, data) {
    this.setState({ lastName: data.value })
  }

  handleChangeAge(evt, data) {
    this.setState({ age: data.value })
  }

  handleChangeCity(evt, data) {
    const city = this.props.cities.filter(city => {
      return city.name === data.value
    })
    this.setState({ city: data.value, neighborhoods: city[0].neighborhoods })
  }

  handleChangeNeigh(evt, data) {
    this.setState({ prefNeighborhoods: data.value })
  }

  handleChangeMiles(evt, data) {
    this.setState({ prefDist: data.value })
  }

  handleChangeSpeed(evt, data) {
    this.setState({ prefSpeed: data.value })
  }

  handleChangeWeekdayTimes(evt, data) {
    this.setState({ prefWeekdayTime: data.value })
  }

  handleChangeWeekendTimes(evt, data) {
    this.setState({ prefWeekendTime: data.value })
  }

}

const mapState = (state) => {
  return {
    cities: state.cities,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data, user) {
      console.log('data',data)
      dispatch(updateProfile(data, user))
    }
  }
}

export default connect(mapState, mapDispatch)(CreateProfileForm)
