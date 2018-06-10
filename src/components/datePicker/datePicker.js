import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import '../../../node_modules/react-daterange-picker/dist/css/react-calendar.css';

const moment = extendMoment(Moment);

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  }
};

// const dateRanges = [
//   {
//     state: 'enquire',
//     range: moment.range(
//       moment().add(2, 'weeks').subtract(5, 'days'),
//       moment().add(2, 'weeks').add(6, 'days')
//     ),
//   },
//   {
//     state: 'unavailable',
//     range: moment.range(
//       moment().add(3, 'weeks'),
//       moment().add(3, 'weeks').add(5, 'days')
//     ),
//   },
// ];

export default class DatePicker extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			value: null,
			states: ''
		}
		console.log(this.props)
	}

  handleSelect(range, states) {
  	console.log(range)
  	console.log(states)
    this.setState({
      value: range,
      states: states,
    });
    console.log(this.state)
    this.props.addDates(range.start, range.end)
  }

  render() {
    return (
      <DateRangePicker
        firstOfWeek={1}
        numberOfCalendars={2}
        selectionType='range'
        minimumDate={new Date()}
        stateDefinitions={stateDefinitions}
        
        defaultState="available"
        showLegend={true}
        value={this.state.value}
        onSelect={this.handleSelect.bind(this)} 
      />
    );
  }
}


