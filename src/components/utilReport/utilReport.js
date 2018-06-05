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
		let generatedUrl;
		if(this.state.generatedUrl && this.state.props.length != 0){
			generatedUrl = (
				<div className="generatedUrlDiv">
					<p>Your API Url:</p>
					<p>{this.state.generatedUrl}</p>
				</div>
			)
		}
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
						          { value: 'month', key: 'dimension', label: 'Month', clearableValue: false },
						          { value: 'week', key: 'dimension', label: 'Week', clearableValue: false },
						          { value: 'hour', key: 'dimension', label: 'Hour', clearableValue: false },
						          { value: 'launch_date', key: 'dimension', label: 'Launch Date', clearableValue: false },
						          { value: 'launch_day', key: 'dimension', label: 'Launch Day', clearableValue: false },
						          { value: 'launch_day_of_week', key: 'dimension', label: 'Launch Day of Week', clearableValue: false },
						          { value: 'launch_month', key: 'dimension', label: 'Launch Month', clearableValue: false },
						          { value: 'launch_time', key: 'dimension', label: 'Launch Time', clearableValue: false },
						          { value: 'launch_week', key: 'dimension', label: 'Launch Week', clearableValue: false },
						          { value: 'launch_year', key: 'dimension', label: 'Launch Year', clearableValue: false },
						          { value: 'zone', key: 'dimension', label: 'Zone', clearableValue: false },
						          { value: 'attached_instance_id', key: 'dimension', label: 'Attached Instance Identifier', clearableValue: false },
						          { value: 'region_zone', key: 'dimension', label: 'Availability Zone', clearableValue: false },
						          { value: 'instance_category', key: 'dimension', label: 'Instance Category', clearableValue: false },
						          { value: 'region', key: 'dimension', label: 'Region', clearableValue: false },
						          { value: 'instance_identifier', key: 'dimension', label: 'Instance ID', clearableValue: false },
						          { value: 'instance_name', key: 'dimension', label: 'Instance Name', clearableValue: false },
						          { value: 'instance_size', key: 'dimension', label: 'Instance Type', clearableValue: false },
						          { value: 'table_name', key: 'dimension', label: 'Table Name', clearableValue: false },
						          { value: 'tenancy', key: 'dimension', label: 'Tenancy', clearableValue: false },
						          { value: 'volume_identifier', key: 'dimension', label: 'Volume Identifier', clearableValue: false },
						          { value: 'dns_name', key: 'dimension', label: 'DNS Name', clearableValue: false },
						          { value: 'ip_address', key: 'dimension', label: 'IP Address', clearableValue: false },
						          { value: 'private_dns_name', key: 'dimension', label: 'Private DNS Name', clearableValue: false },
						          { value: 'private_ip_address', key: 'dimension', label: 'Private IP', clearableValue: false },
						          { value: 'subnet', key: 'dimension', label: 'Subnet ID', clearableValue: false },
						          { value: 'vpc_id', key: 'dimension', label: 'VPC Identifier', clearableValue: false },
						          { value: 'architecture', key: 'dimension', label: 'Architecture', clearableValue: false },
						          { value: 'operating_system', key: 'dimension', label: 'OS', clearableValue: false },
						          { value: 'virtualization_type', key: 'dimension', label: 'Virtualization', clearableValue: false },
						          { value: 'days_since_launch', key: 'dimension', label: 'Days Alive', clearableValue: false },
						          { value: 'storage_type', key: 'dimension', label: 'Storage Type', clearableValue: false },
						          { value: 'vendor_account_identifier', key: 'dimension', label: 'Account ID', clearableValue: false },
						          { value: 'vendor_account_name', key: 'dimension', label: 'Account Name', clearableValue: false },
						          { value: 'image', key: 'dimension', label: 'AMI', clearableValue: false },
						          { value: 'product_name', key: 'dimension', label: 'Product Name', clearableValue: false },
						          { value: 'security_group_id', key: 'dimension', label: 'Security Group ID', clearableValue: false },
						          { value: 'security_group_name', key: 'dimension', label: 'Security Groups Names', clearableValue: false },
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
				{generatedUrl}
			</div>
		)
	}
}