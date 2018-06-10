import React from 'react';
import DragFrom from '../dragFrom/dragFrom';
import DatePicker from '../datePicker/datePicker';
import Moment from 'moment';

import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select.css';

export default class CostReport extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'https://app.cloudability.com/api/1/reporting/cost/run', 
			props: [],
			indexVal: [],
			generatedUrl: '',
			parameter: '',
			parameterInput: '',
			selectedDimensionOption: '',
			selectedMetricOption: ''
		}
	}

	handleDimensionChange = (selectedDimensionOption) => {
		console.log(selectedDimensionOption)
		let index = selectedDimensionOption.length -1;
    	this.setState({ selectedDimensionOption: selectedDimensionOption });
    	if(selectedDimensionOption){
    		this.selectItems(selectedDimensionOption[index].key, selectedDimensionOption[index].value)
    	}
  	}

  	handleMetricChange = (selectedMetricOption) => {
		console.log(selectedMetricOption)
		let index = selectedMetricOption.length -1;
    	this.setState({ selectedMetricOption: selectedMetricOption });
    	if(selectedMetricOption){
    		this.selectItems(selectedMetricOption[index].key, selectedMetricOption[index].value)
    	}
  	}

	selectItems(key, value){
		//prevents more than two dates - overrides origional date of new date range selected 
		if(key == 'start_date' || key == 'end_date'){
			let isThereDate = this.state.props.findIndex( date => {
	  			let itemKey = date.split(':');
	  			return key == itemKey[0]
			});
			if(isThereDate != -1){
				this.state.props.splice(isThereDate, 1)
				this.setState({props: this.state.props})
			}
		}
		
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
  			if(key[0] == 'dimension'){
	  			this.state.selectedDimensionOption.map((item, index)   => {
	  				console.log(item)
	  				console.log(index)
	  				if(item.value == key[1]){
	  					this.state.selectedDimensionOption.splice(index, 1)
	  					this.setState({selectedDimensionOption: this.state.selectedDimensionOption})
	  				}
	  			})
  			}else if(key[0] == 'metrics'){
  				console.log(this.state.selectedMetricOption)
  				this.state.selectedMetricOption.map((item, index)   => {
	  				console.log(item)
	  				console.log(index)
	  				if(item.value == key[1]){
	  					this.state.selectedMetricOption.splice(index, 1)
	  					this.setState({selectedMetricOption: this.state.selectedMetricOption})
	  				}
	  			})
  			} else {
  				this.state.props.map((item, index) => {
  					let propKey = item.split(":");
  					if(propKey[1] == key[1]){
  						this.state.props.splice(index, 1)
  						this.setState({props: this.state.props})
  					}
  				})
  			}
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
				<span>
					<p>Your API Url:</p>
					<p>{this.state.generatedUrl}</p>
				</span>
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
	    		<div className="csvDiv">
	    			<label>CSV Format</label>
	    			<input type="checkbox" onClick={() => this.setState({apiVersion: 'https://app.cloudability.com/api/1/reporting/cost/run.csv'})}/>
	    		</div>
	    		<div className="DimensionsMetrics">
		    		<div>
			    		<h2>Dimensions</h2>	
				    		<Select
				    			multi={true}
						        name="form-field-name"
						        value={this.state.selectedDimensionOption}
						        onChange={this.handleDimensionChange}
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
						          { value: 'vendor_account_identifier', key: 'dimension', label: 'Account ID', clearableValue: false },
						          { value: 'vendor_account_name', key: 'dimension', label: 'Account Name', clearableValue: false },
						          { value: 'region_zone', key: 'dimension', label: 'Availability Zone', clearableValue: false },
						          { value: 'item_description', key: 'dimension', label: 'Item Description', clearableValue: false },
						          { value: 'account_identifier', key: 'dimension', label: 'Payer Account ID', clearableValue: false },
						          { value: 'account_name', key: 'dimension', label: 'Payer Account Name', clearableValue: false },
						          { value: 'service_name', key: 'dimension', label: 'Product Name', clearableValue: false },
						          { value: 'region', key: 'dimension', label: 'Region', clearableValue: false },
						          { value: 'seller', key: 'dimension', label: 'Seller', clearableValue: false },
						          { value: 'enhanced_service_name', key: 'dimension', label: 'Service Name', clearableValue: false },
						          { value: 'vendor', key: 'dimension', label: 'Vendor', clearableValue: false },
						          { value: 'zone', key: 'dimension', label: 'Zone', clearableValue: false },
						        ]}
						    />
				    </div>
				    <div>
			    		<h2>Metrics</h2>	
				    		<Select
				    			multi={true}
						        name="form-field-name"
						        value={this.state.selectedMetricOption}
						        onChange={this.handleMetricChange}
						        options={[
						          { value: 'unblended_cost', key: 'metrics', label: 'Cost (Total)', clearableValue: false },
						          { value: 'adjusted_cost', key: 'metrics', label: 'Cost (Adjusted)', clearableValue: false },
						          { value: 'total_amortized_cost', key: 'metrics', label: 'Cost (Amortized)', clearableValue: false },
						          { value: 'invoiced_cost', key: 'metrics', label: 'Cost (Total Blended)', clearableValue: false },
						          { value: 'cost_adjusted', key: 'metrics', label: 'Cost Adjustment', clearableValue: false },
						          { value: 'blended_rate', key: 'metrics', label: 'Rate (Blended)', clearableValue: false },
						          { value: 'unblended_rate', key: 'metrics', label: 'Rate (Unblended)', clearableValue: false },					          
						        ]}
						    />
				    </div>
				</div>
				<DragFrom items={this.state.props} indexVal={this.state.indexVal} passItemBackToParent={this.passItemBackToParent.bind(this)}/>
				<div className="generatedUrlDiv">
					{generatedUrl}
				</div>
			</div>
		)
	}
}



