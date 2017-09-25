import React, { Component } from 'react'
import { Button, Checkbox, Form, Dropdown, Input, TextArea, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { findBuddies, addRequestedRun } from '../store'
import history from '../history'
import {NavLink} from 'react-router-dom'
//import DatePicker from 'react-datepicker';
import moment from 'moment';

export class RequestBuddyForm extends Component {
  constructor(props) {
    super(props)
    // maintain local state for input while writing
    this.state = {
      city: '',
      neighborhoods: [],
      prefNeighborhood: '',
      prefDist: '',
      prefSpeed: '',
      time: '',
      AMPM: 'AM',
      date: ''
    }
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.getCityDropdown = this.getCityDropdown.bind(this);
    this.getNeighborhoodDropdown = this.getNeighborhoodDropdown.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeNeigh = this.handleChangeNeigh.bind(this);
    this.handleChangeAMPM = this.handleChangeAMPM.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.handleChangeMiles = this.handleChangeMiles.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this)
  }

  render() {
    const city_dropdown = this.getCityDropdown()
    const neighborhood_dropdown = this.getNeighborhoodDropdown()

    return (
      <div>
      <Form label="Going on a run? Find a buddy!" onSubmit={(evt) => this.props.handleSubmit(evt, this.state, this.props.user)}>
        <h2> Going on a run? Find a buddy! </h2>
        <h4>Where are you running?</h4>
        <Form.Field control={Dropdown} label="City" placeholder="Choose City" selectOnBlur={false} options={city_dropdown} onChange={this.handleChangeCity} />
        <Form.Field control={Dropdown} label="Neighborhood" placeholder="Choose Neighborhood" selectOnBlur={false} options={neighborhood_dropdown} onChange={this.handleChangeNeigh} />
        <br>
        </br>

        <h4>How far and how fast?</h4>
        <Form.Field control={Input} label="Distance (in miles)" placeholder="4" onChange={this.handleChangeMiles} />
        <Form.Field control={Input} label="Speed (min per mile)" placeholder="9:30" onChange={this.handleChangeSpeed} />
        <br>
        </br>

        <h4>When you are going?</h4>
        {/*add calendar api?*/}
        <Form.Field inline control={Input} label="Date" placeholder={new Date(Date.now()).toDateString()} onChange={this.handleChangeDate} />
        <Form.Group inline>
        <Form.Field control={Input} label="Time" placeholder="7:45" onChange={this.handleChangeTime} />
        <Form.Field control={Dropdown} value="AM" selectOnBlur={false} options={[{key: "AM", value: "AM", text: "AM"},{key: "PM", value: "PM", text: "PM"}]} onChange={this.handleChangeAMPM} />
        </Form.Group>
        <br>
        </br>
        {this.props.user.id &&
          <Form.Field control={Button} color="green">Submit</Form.Field>
        }
      </Form>
      {!this.props.user.id &&
        this.PopupSubmit()
     }
     </div>
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


  handleChangeCity(evt, data) {
    const city = this.props.cities.filter(city => {
      return city.name === data.value
    })
    this.setState({ city: data.value, neighborhoods: city[0].neighborhoods })
  }

  handleChangeNeigh(evt, data) {
    this.setState({ prefNeighborhood: data.value })
  }

  handleChangeTime(evt, data) {
    this.setState({ time: data.value })
  }

  handleChangeAMPM(evt, data) {
    this.setState({ AMPM: data.value})
  }

  handleChangeMiles(evt, data) {
    this.setState({ prefDist: data.value})
  }

  handleChangeSpeed(evt, data) {
    this.setState({ prefSpeed: data.value})
  }

  handleChangeDate(evt, data) {
    this.setState({ date: new Date(data.value)})
  }

  PopupSubmit = () => (
    <Popup
      trigger={<a href='/login'><Button color="grey">Submit</Button></a>}
      content='Log in or sign up to request a buddy!'
    />
  )
}

const mapState = (state) => {
  return {
    cities: state.cities,
    user: state.user,
    profile: state.user.profile,
    buddies: state.buddies,
    requestedRun: state.requestedRun
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, state, user) {
      // pass in only what needed
      state.profileId = user.profileId
      dispatch(findBuddies(state))
      dispatch(addRequestedRun(state))
      history.push('/buddies')
    }
  }
}

export default connect(mapState, mapDispatch)(RequestBuddyForm)
