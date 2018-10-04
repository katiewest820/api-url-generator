import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import '../../../node_modules/react-daterange-picker/dist/css/react-calendar.css';
import './datePicker.css';

const moment = extendMoment(Moment);

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  }
};

export default class DatePicker extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			value: null,
			states: ''
		}
	}

  handleSelect(range, states) {
    this.setState({
      value: range,
      states: states,
    });
    this.props.addDates(range.start, range.end);
  }

  render() {
    return (
      <DateRangePicker
        firstOfWeek={1}
        numberOfCalendars={2}
        selectionType='range'
        stateDefinitions={stateDefinitions}
        minimumNights={0}
        singleDateRange={true}
        defaultState="available"
        value={this.state.value}
        onSelect={this.handleSelect.bind(this)} 
      />
    );
  }
}


