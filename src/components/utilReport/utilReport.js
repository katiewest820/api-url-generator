import React from 'react';
import DragFrom from '../dragFrom/dragFrom';
import DatePicker from '../datePicker/datePicker';
import Moment from 'moment';

import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select.css';

export default class UtilReport extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'https://app.cloudability.com/api/1/reporting/run', 
			props: [],
			indexVal: [],
			generatedUrl: '',
			parameter: '',
			parameterInput: '',
			selectedOption: '',
			
			
		}
	}

	handleChange = (selectedOption) => {
		console.log(selectedOption)
		let index = selectedOption.length -1;
    	this.setState({ selectedOption: selectedOption });
    	if(selectedOption){
    		
    		this.selectItems(selectedOption[index].key, selectedOption[index].value)
    	}

  	}

	selectItems(key, value){
  		this.state.props.push(`${key}:${value}`);
  		let newItemsList = this.state.props;
  		let nextIndexVal;
    	if(this.state.props.length > 0){
    		let nextIndexVal = this.state.props.length -1;
      		this.state.indexVal.push(nextIndexVal)
      	}
  		this.passItemBackToParent(this.state.props, "")
  	}

  	addDates(start, end){
  		let startDate = Moment(start).format('YYYY-MM-DD')
  		let endDate = Moment(end).format('YYYY-MM-DD')
  		this.selectItems('start_date', startDate)
  		this.selectItems('end_date', endDate)
  	}

  	passItemBackToParent(items, deletedValue){
  		
  		console.log(deletedValue)
  		if(deletedValue.length > 0){
  			let key = deletedValue.split(":")
  			console.log(key)
  			
  			this.state.selectedOption.map((item, index)   => {
  				console.log(item)
  				console.log(index)
  				if(item.value == key[1]){
  					this.state.selectedOption.splice(index, 1)
  					this.setState({selectedOption: this.state.selectedOption})
  					
  				}
  			})
  			
  		}
  		this.setState({props: items})
  		let string = items.toString().toLowerCase().replace(/:/g, '=');
  		let metrics_dimensions = string.replace(/,/g, '&');
  		this.generateApiUrl(metrics_dimensions)
  	}
  		
  	generateApiUrl(metrics_dimensions){
  	 	let result = '';
  		result = `${this.state.apiVersion}/${metrics_dimensions}`
  		this.setState({generatedUrl: result})
  	}

  	addParamenter(){
  		this.selectItems(this.state.parameter, this.state.parameterInput)
  	}

	render(){
		console.log(this.state.props)
		let selectedOption = this.state.selectedOption;
		
		return(
			<div className="reportBuildDiv">
				
	    		<DatePicker addDates={this.addDates.bind(this)}/>
	    		<div>
	    			<select value={this.state.parameter} onChange={e => this.setState({parameter: e.target.value})}>
	    				<option></option>
	    				<option value="sort_by" onClick={e => this.setState({parameter: e.target.value})}>Sort By</option>
	    				<option value="order" onClick={e => this.setState({parameter: e.target.value})}>Order</option>
	    				<option value="ofset" onClick={e => this.setState({parameter: e.target.value})}>Ofset</option>
	    				<option value="max_results" onClick={e => this.setState({parameter: e.target.value})}>Max Results</option>
	    				<option value="chart" onClick={e => this.setState({parameter: e.target.value})}>Chart</option>
	    			</select>
	    			<input type="text" onChange={e => this.setState({parameterInput: e.target.value})}/>
	    			<button onClick={this.addParamenter.bind(this)}>Add</button>
	    		</div>
	    		<div className="DimensionsMetrics">
		    		<div>
			    		<h2>Dimensions</h2>	
				    		<Select
				    			multi={true}
						        name="form-field-name"
						        value={selectedOption}
						        onChange={this.handleChange}
						        options={[
						          { value: 'date', key: 'dimension', label: 'Date', clearableValue: false },
						          { value: 'day', key: 'dimension', label: 'Day', clearableValue: false },
						          { value: 'day_of_week', key: 'dimension', label: 'Day of Week', clearableValue: false },
						          { value: 'year', key: 'dimension', label: 'Year', clearableValue: false },
						          { value: 'month', key: 'dimension', label: 'Month (Category)', clearableValue: false },
						          { value: 'year_month', key: 'dimension', label: 'Month (Year)', clearableValue: false },
						          { value: 'week', key: 'dimension', label: 'Week (Category)', clearableValue: false },
						          { value: 'year_week', key: 'dimension', label: 'Week (Year)', clearableValue: false },
						          { value: 'compute_usage_type', key: 'dimension', label: 'Compute Usage Type', clearableValue: false },
						          { value: 'engine', key: 'dimension', label: 'Engine', clearableValue: false },
						          { value: 'instance_category', key: 'dimension', label: 'Instance Category', clearableValue: false },
						          { value: 'instance_family', key: 'dimension', label: 'Instance Family', clearableValue: false },
						          { value: 'instance_size', key: 'dimension', label: 'Instance Size', clearableValue: false },
						          { value: 'instance_type', key: 'dimension', label: 'Instance Type', clearableValue: false },
						          { value: 'lease_type', key: 'dimension', label: 'Lease Type', clearableValue: false },
						          { value: 'operating_system', key: 'dimension', label: 'Operating System', clearableValue: false },
						          { value: 'operation', key: 'dimension', label: 'Operation', clearableValue: false },
						          { value: 'reservation_identifier', key: 'dimension', label: 'Reservation ID', clearableValue: false },
						          { value: 'resource_identifier', key: 'dimension', label: 'Resource ID', clearableValue: false },
						          { value: 'transaction_type', key: 'dimension', label: 'Transaction Type', clearableValue: false },
						          { value: 'usage_family', key: 'dimension', label: 'Usage Family', clearableValue: false },
						          { value: 'usage_type', key: 'dimension', label: 'Usage Type', clearableValue: false },

						          
						        ]}
						    />
				    </div>
				    <div>
					    <h2>Metrics</h2>	
				    		<h3>Processing</h3>
				    			<label>Bandwidth In</label>
					    		<input type="checkbox" value="date" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Bandwidth Out</label>
					    		<input type="checkbox" value="day" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Day of Week</label>
					    		<input type="checkbox" value="day_of_week" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Year</label>
					    		<input type="checkbox" value="year" onClick={e => this.selectItems("metric", e.target.value)}/>
					    	<h3>Usage</h3>
					    		<label>Compute Usage Type</label>
					    		<input type="checkbox" value="compute_usage_type" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Engine</label>
					    		<input type="checkbox" value="engine" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Instance Category</label>
					    		<input type="checkbox" value="instance_category" onClick={e => this.selectItems("metric", e.target.value)}/>
					    		<label>Instance Family</label>
					    		<input type="checkbox" value="instance_family" onClick={e => this.selectItems("metric", e.target.value)}/>
					</div>
				</div>
				<DragFrom items={this.state.props} indexVal={this.state.indexVal} passItemBackToParent={this.passItemBackToParent.bind(this)}/>
				<p>{this.state.generatedUrl}</p>
			</div>
		)
	}
}