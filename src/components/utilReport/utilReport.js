import React from 'react';
import DragFrom from '../dragFrom/dragFrom';
import DatePicker from '../datePicker/datePicker';
import Moment from 'moment';
import ToggleFilters from '../toggleFilters/toggleFilters';
import ToggleParams from '../toggleParams/toggleParams';
import Select from 'react-select';
import {utilMetrics} from '../metrics_dimensions/metrics';
import {utilDimensions} from '../metrics_dimensions/dimensions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../../../node_modules/react-notifications/lib/notifications.css';
import '../../../node_modules/react-select/dist/react-select.css';

export default class UtilReport extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'https://app.cloudability.com/api/2/reporting/compare/enqueue?auth_token=[YOUR AUTH TOKEN]', 
			props: [],
			labels: [],
			indexVal: [],
			generatedUrl: '',
			parameter: '',
			parameterInput: '',
			selectedFilter: '',
			selectedDimensionOption: '',
			selectedMetricOption: ''
		}
	}

	createNotification = (type) => {
	    return () => {
	      	switch (type) {
	    		case 'success':
	          		NotificationManager.success('URL Copied!', '', 3000)
	        	break;
	      	}
	    };
  	};


	handleDimensionChange = (selectedDimensionOption) => {
		
		let index = selectedDimensionOption.length -1;
		console.log(selectedDimensionOption)
		this.state.labels.push(selectedDimensionOption[index].label);
		
    	this.setState({ selectedDimensionOption: selectedDimensionOption });
    	if(selectedDimensionOption){
    		this.selectItems(selectedDimensionOption[index].key, selectedDimensionOption[index].value)
    	}
  	}

  	handleMetricChange = (selectedMetricOption) => {
		let index = selectedMetricOption.length -1;
		console.log(selectedMetricOption)
		this.state.labels.push(selectedMetricOption[index].label);
		console.log(this.state.labels)
    	this.setState({ selectedMetricOption: selectedMetricOption });
    	if(selectedMetricOption){
    		this.selectItems(selectedMetricOption[index].key, selectedMetricOption[index].value)
    	}
  	}

	selectItems(key, value){
		console.log(key)
		console.log(value)
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
			this.state.props.push(`${key}:${value}`);
  			this.state.labels.push(`${key}:${value}`);
			
		}else {
	  		this.state.props.push(`${key}:${value}`);
	  	}
	  		//this.state.labels.push(`${key}:${value}`);
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
  		this.state.labels.push(`${key} ${filter} ${value}`);
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

  	
  	passLabelBackToParent(labels, indexVal){
  		this.setState({labels: labels});
  		this.setState({indexVal: indexVal});
  	}

  	passItemBackToParent(items, deletedValue){
  		
  		if(deletedValue.length > 0){
  			let key = deletedValue.split(":")
  			
  			if(key[0] == 'dimensions'){
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
  			} //else {
  			// 	this.state.props.map((item, index) => {
  			// 		let propKey = item.split(":");
  			// 		if(propKey[1] == key[1]){
  			// 			this.state.props.splice(index, 1)
  			// 			this.setState({props: this.state.props})
  			// 		}
  			// 	})
  			// }
  		}
  		this.setState({props: items})
  		console.log(items)

  		let checkForSortBy = []; 
  		let checkForOffset = [];
  		let checkForMaxResults = [];
  		let firstReportVal;
  		let sortByVal = '';
  		let offsetVal = '';
  		let maxResultsVal = '';
  		let sortByStatus;
  		let maxResultsStatus;
  		let offsetStatus;
		for(let i = 0; i < items.length; i++){
			checkForSortBy.push(items[i].includes('sort_by'))
			checkForOffset.push(items[i].includes('offset'))
			checkForMaxResults.push(items[i].includes('max_results'))

			console.log(checkForSortBy)
			console.log(checkForOffset)
			console.log(checkForMaxResults)
			sortByStatus = checkForSortBy.indexOf(true)
			maxResultsStatus = checkForMaxResults.indexOf(true)
			offsetStatus = checkForOffset.indexOf(true)
		}
		console.log(sortByStatus)
		console.log(maxResultsStatus)
		console.log(offsetStatus)

		for(let i = 0; i < items.length; i++){
			if(sortByStatus == -1 && items[i].includes('dimensions') || sortByStatus == -1 && items[i].includes('metrics')){
				firstReportVal = items[i].split(':')
				sortByVal = `&sort_by=${firstReportVal[1]}`
			}
		}

		if(offsetStatus == -1 ){
			offsetVal = '&offset=0'
		}
		if(maxResultsStatus == -1){
			maxResultsVal = '&max_results=0'
		}

  		let string = items.map((item, index) => {
  			console.log(item)
  			if(item.startsWith('dimensions') || item.startsWith('metrics') || item.startsWith('filters')){
  				return item.toLowerCase().replace(/:/g, '[]=')
  			}
  			else{
  				return item.toLowerCase().replace(/:/g, '=')
  			}
  		})
  		let metrics_dimensions = string.toString().replace(/,/g, '&');
  		this.generateApiUrl(metrics_dimensions, sortByVal, maxResultsVal, offsetVal)
  	}
  		
  	generateApiUrl(metrics_dimensions, sortByVal, maxResultsVal, offsetVal){
  	 	let result = '';
  		result = `${this.state.apiVersion}&${metrics_dimensions}${sortByVal}${maxResultsVal}${offsetVal}`
  		this.setState({generatedUrl: result})
  	}

  	csvReport(){
  		if(this.state.apiVersion.includes('csv')){
  			this.setState({apiVersion: 'https://app.cloudability.com/api/2/reporting/compare/enqueue?auth_token=[YOUR AUTH TOKEN]'})
  		}else{
  			this.setState({apiVersion: 'https://app.cloudability.com/api/2/reporting/compare/enqueue.csv?auth_token=[YOUR AUTH TOKEN]'})
  		}	
  		setTimeout(() => {
  			this.passItemBackToParent(this.state.props, "")
  		}, 200)
  	}

  	addParameter(parameter, parameterInput){
  		if(parameter == "sort_by"){
  			this.state.labels.push(`sort by:${parameterInput}`);
  		}
  		else if(parameter == "max_results"){
  			this.state.labels.push(`max results:${parameterInput}`);
  		}else{
  			this.state.labels.push(`${parameter}:${parameterInput}`);
  		}
  		this.setState({parameter: parameter});
  		this.setState({parameterInput: parameterInput});
  		this.selectItems(parameter, parameterInput)
  	}

	render(){
		let selectedOption = this.state.selectedOption;
		let generatedUrl = (<div className="generatedUrlDiv"></div>);
		if(this.state.generatedUrl && this.state.props.length != 0){
			generatedUrl = (
				<div className="generatedUrlDiv">
					<div className="csvDiv">
		    			<label>CSV Format</label>
		    			<input type="checkbox" onClick={this.csvReport.bind(this)}/>
		    		</div>
					<div >
						<p>Your API Url:</p>
						<CopyToClipboard text={this.state.generatedUrl}>
				            <span onClick={this.createNotification('success')}>
				            	{this.state.generatedUrl}
				            </span>
				        </CopyToClipboard>
				        <NotificationContainer/>
					</div>
				</div>
			)
		}
		return(
			<div className="reportBuildDiv">
	    		<DatePicker addDates={this.addDates.bind(this)}/>
	    		<div className="paramAndFilterDivs">
	    			<ToggleParams reportType='util' addParameter={this.addParameter.bind(this)}/>
	    			<ToggleFilters reportType='util' addFilter={this.addFilter.bind(this)}/>
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
				<DragFrom items={this.state.props} labels={this.state.labels} indexVal={this.state.indexVal} passItemBackToParent={this.passItemBackToParent.bind(this)} passLabelBackToParent={this.passLabelBackToParent.bind(this)}/>
				{generatedUrl}
			</div>
		)
	}
}