import React, { Component } from 'react'
import { Button, Checkbox, Form, Dropdown, Input, TextArea, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateProfile } from '../store'

export class CreateProfileForm extends Component {

  componentWillUpdate(nextProps) {
    if (this.props.cities !== nextProps.cities) {
      this.getNeighborhoods(this.props.user.profile.city, nextProps.cities)
    }
  }

  constructor(props) {
    super(props)
    // maintain local state for input while writing
    this.state = {
      firstName: this.props.user.profile.firstName,
      lastName: this.props.user.profile.lastName,
      age: this.props.user.profile.age,
      city: this.props.user.profile.city,
      neighborhoods: [],
      prefNeighborhoods: this.props.user.profile.prefNeighborhoods,
      prefDist: this.props.user.profile.prefDist,
      prefSpeed: this.props.user.profile.prefSpeed,
      prefWeekdayTime: this.props.user.profile.prefWeekdayTime,
      prefWeekendTime: this.props.user.profile.prefWeekendTime,
      phone: this.props.user.profile.phone
    }

    this.getNeighborhoods = this.getNeighborhoods.bind(this);
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
    this.handleChangePhone = this.handleChangePhone.bind(this);
  }

  render() {
    const city_dropdown = this.getCityDropdown()
    const neighborhood_dropdown = this.getNeighborhoodDropdown()
    const miles_dropdown = this.getMilesDropdown()
    const speed_dropdown = this.getSpeedDropdown()
    const time_dropdown = this.getTimeDropdown()
    return (

      <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state, this.props.user)}>
        <h2>Edit Your Profile:</h2>
        <h4>Profile Information</h4>
        <Form.Field required control={Input} label='First Name' value={this.state.firstName} onChange={this.handleChangeFirstName} />
        <Form.Field required control={Input} label='Last Name' value={this.state.lastName} onChange={this.handleChangeLastName} />
        <Form.Field control={Input} label='Age' value={this.state.age} onChange={this.handleChangeAge} />
        <Form.Field required control={Input} label='Phone Number' value={this.state.phone} onChange={this.handleChangePhone} />
        <br />

        <h4>Running Preferences</h4>
        <Form.Group>
        <Form.Field required control={Dropdown} label="City" value={this.state.city} selectOnBlur={false} options={city_dropdown} onChange={this.handleChangeCity} />
        </Form.Group>

        <Form.Group>
        <Form.Field control={Dropdown} label="Preferred Neighborhoods" value={this.state.prefNeighborhoods} fluid multiple selection placeholder="Choose Neighborhoods" selectOnBlur={false} options={neighborhood_dropdown} onChange={this.handleChangeNeigh} />
        </Form.Group>
        <br/>

        <Form.Group>
        <Form.Field required control={Dropdown} label="Preferred Distance (miles)"
        value={`${this.state.prefDist}`}
        selectOnBlur={false} options={miles_dropdown} onChange={this.handleChangeMiles} />
        <Form.Field required control={Dropdown} label="Preferred Speed (min per mile)" value={this.state.prefSpeed} selectOnBlur={false} options={speed_dropdown} onChange={this.handleChangeSpeed} />
        </Form.Group>
        <br />

        <h4>Time Preferences</h4>
        <Form.Group>
        <Form.Field control={Dropdown} label="Weekday Times" value={this.state.prefWeekdayTime} selectOnBlur={false} fluid multiple selection options={time_dropdown} onChange={this.handleChangeWeekdayTimes} />
        <Form.Field control={Dropdown} label="Weekend Times" value={this.state.prefWeekendTime} fluid multiple selection placeholder="Choose Time of Day" selectOnBlur={false} options={time_dropdown} onChange={this.handleChangeWeekendTimes} />
        </Form.Group>
        <br />

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
    const dropdown = this.state.neighborhoods.map(neighborhood => {
      return {
        key: neighborhood.id,
        value: neighborhood.name,
        text: neighborhood.name
      }
    })
    return dropdown
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

  getNeighborhoods(prefCity, cities) {

    const city = cities.filter(city => {
      return city.name === prefCity
    })
    this.setState({ neighborhoods: city[0].neighborhoods })
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

  handleChangePhone(evt, data) {
    this.setState({ phone: data.value })
  }

}

const mapState = (state) => {
  return {
    cities: state.cities,
    user: state.user,
    neighborhoods: state.neighborhoods
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data, user) {
      dispatch(updateProfile(data, user))
    }
  }
}

export default connect(mapState, mapDispatch)(CreateProfileForm)
