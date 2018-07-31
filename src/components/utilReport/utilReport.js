import React from 'react';
import DragFrom from '../dragFrom/dragFrom';
import DatePicker from '../datePicker/datePicker';
import Moment from 'moment';
import ToggleFilters from '../toggleFilters/toggleFilters';
import ToggleParams from '../toggleParams/toggleParams';
import Select from 'react-select';
import {utilMetrics} from '../metrics_dimensions/metrics';
import {utilDimensions} from '../metrics_dimensions/dimensions';
import '../../../node_modules/react-select/dist/react-select.css';

export default class UtilReport extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'https://app.cloudability.com/api/1/reporting/run?auth_token=[YOUR AUTH TOKEN]', 
			props: [],
			labels: [],
			indexVal: [],
			generatedUrl: '',
			parameter: '',
			parameterInput: '',
			selectedDimensionOption: '',
			selectedMetricOption: ''
		}
	}

	handleDimensionChange = (selectedDimensionOption) => {
		
		let index = selectedDimensionOption.length -1;
		this.state.labels.push(selectedDimensionOption[index].label);
		
    	this.setState({ selectedDimensionOption: selectedDimensionOption });
    	if(selectedDimensionOption){
    		this.selectItems(selectedDimensionOption[index].key, selectedDimensionOption[index].value)
    	}
  	}

  	handleMetricChange = (selectedMetricOption) => {
		
		let index = selectedMetricOption.length -1;
		this.state.labels.push(selectedMetricOption[index].label);
		
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
				this.state.labels.splice(isThereDate, 1)
				this.setState({props: this.state.props})
				this.setState({labels: this.state.labels})
			}
		}
  		this.state.props.push(`${key}:${value}`);
  		this.state.labels.push(`${key}:${value}`);
  		let nextIndexVal;
    	if(this.state.props.length > 0){
    		let nextIndexVal = this.state.props.length -1;
      		this.state.indexVal.push(nextIndexVal)
      	}
  		this.passItemBackToParent(this.state.props, "")
  	}

  	addFilter(key, value, filter){
  		
  		this.setState({parameter: key});
  		this.setState({parameterInput: value});
  		this.setState({selectedFilter: filter});
  		this.state.props.push(`filters:${key}${filter}${value}`);
  		let newItemsList = this.state.props;
		let nextIndexVal = this.state.props.length -1;
		this.state.indexVal.push(nextIndexVal);
		this.passItemBackToParent(this.state.props, "");
		
  	}

  	addDates(start, end){
  		let startDate = Moment(start).format('YYYY-MM-DD')
  		let endDate = Moment(end).format('YYYY-MM-DD')
  		this.selectItems('start_date', startDate)
  		this.selectItems('end_date', endDate)
  	}

  	
  	passLabelBackToParent(labels){
  		this.setState({labels: labels});
  	}

  	passItemBackToParent(items, deletedValue){
  		
  		if(deletedValue.length > 0){
  			let key = deletedValue.split(":")
  			
  			if(key[0] == 'dimension'){
	  			this.state.selectedDimensionOption.map((item, index)   => {
	  				
	  				if(item.value == key[1]){
	  					this.state.selectedDimensionOption.splice(index, 1)
	  					this.setState({selectedDimensionOption: this.state.selectedDimensionOption})
	  				}
	  			})
  			}else if(key[0] == 'metrics'){
  				
  				this.state.selectedMetricOption.map((item, index)   => {
	  				
	  				if(item.value == key[1]){
	  					this.state.selectedMetricOption.splice(index, 1)
	  					this.setState({selectedMetricOption: this.state.selectedMetricOption})
	  				}
	  			});
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

  	csvReport(){
  		
  		if(this.state.apiVersion.includes('csv')){
  			console.log('yeahhh')
  			this.setState({apiVersion: 'https://app.cloudability.com/api/1/reporting/run?auth_token=[YOUR AUTH TOKEN]'})
  		}else{
  			this.setState({apiVersion: 'https://app.cloudability.com/api/1/reporting/run.csv?auth_token=[YOUR AUTH TOKEN]'})
  		}	
  		setTimeout(() => {
  			this.passItemBackToParent(this.state.props, "")
  		}, 200)
  	}

  	addParameter(){
  		this.selectItems(this.state.parameter, this.state.parameterInput)
  	}

	render(){
		
		let selectedOption = this.state.selectedOption;
		let generatedUrl;
		if(this.state.generatedUrl && this.state.props.length != 0){
			generatedUrl = (
				<div className="generatedUrlDiv">
					<p>Your API Url:</p>
					<a href={this.state.generatedUrl} target="_blank">{this.state.generatedUrl}</a>
				</div>
			)
		}
		return(
			<div className="reportBuildDiv">
	    		<DatePicker addDates={this.addDates.bind(this)}/>
	    		<div className="paramAndFilterDivs">
	    			<ToggleParams addParameter={this.addParameter.bind(this)}/>
	    			<ToggleFilters addFilter={this.addFilter.bind(this)}/>
	    		</div>
	    		<div className="csvDiv">
	    			<label>CSV Format</label>
	    			<input type="checkbox" onClick={this.csvReport.bind(this)}/>
	    		</div>
	    		<div className="DimensionsMetrics">
		    		<div>
			    		<h2>Dimensions</h2>	
				    		<Select
				    			multi={true}
						        name="form-field-name"
						        value={this.state.selectedDimensionOption}
						        onChange={this.handleDimensionChange}
						        options={utilDimensions}
						    />
				    </div>
				   	<div>
			    		<h2>Metrics</h2>	
			    		<Select
			    			multi={true}
					        name="form-field-name"
					        value={this.state.selectedMetricOption}
					        onChange={this.handleMetricChange}
					        options={utilMetrics}
					    />
				    </div>
				</div>
				<DragFrom items={this.state.props} labels ={this.state.labels} indexVal={this.state.indexVal} passItemBackToParent={this.passItemBackToParent.bind(this)} passLabelBackToParent={this.passLabelBackToParent.bind(this)}/>
				{generatedUrl}
			</div>
		)
	}
}