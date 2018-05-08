import React from 'react';
import DragFrom from '../dragFrom/dragFrom';

export default class UtilReport extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'https://app.cloudability.com/api/1/reporting/cost/run',
			startDate: '',
			endDate: '',
			props: [],
			metrics_dimensions: [],
			generatedUrl: ''
			
		}
	}

	selectItems(key, value){
  		console.log(value)
  		console.log(key)
  		
  		if(key == 'Dimension'){
  			this.state.metrics_dimensions.push(`dimensions=${value}`)
  		}else if(key == 'Metrics'){
  			this.state.metrics_dimensions.push(`metrics=${value}`)
  		}
  		else {
  			this.state.metrics_dimensions.push(`${key}=${value}`)
  		}
  		this.state.props.push(`${key}:${value}`);
  		let newItemsList = this.state.props;
  		//this.setState({startDate: ''});
  		this.passItemBackToParent(this.state.props)
  	}

  

  	passItemBackToParent(items){
  		console.log(items)
  		this.setState({props: items})
  		let string = items.toString().toLowerCase().replace(/:/g, '=');
  		let metrics_dimensions = string.replace(/,/g, '&');
  		console.log(metrics_dimensions)
  		//this.setState({metrics_dimensions: metrics_dimensions})
  		this.generateApiUrl(metrics_dimensions)
  	}
  		
  	generateApiUrl(metrics_dimensions){
  	 	let result = '';
  	 	 //let metrics_dimensions = '';
  	 	// metrics_dimensions = this.state.metrics_dimensions.toString().replace(/,/g,'&');

  	 	// console.log(metrics_dimensions)

  		result = `${this.state.apiVersion}/${metrics_dimensions}`
  		console.log(result)
  		this.setState({generatedUrl: result})

  	}

	render(){
		console.log(this.state.props)
		return(
			<div className="reportBuildDiv">
				<label>Start Date</label>
	    		<input type="date" onChange={e => this.setState({startDate: e.target.value})}/>
	    		<button onClick={e => this.selectItems("start_date", this.state.startDate)}>Add</button>
	    		<label>end Date</label>
	    		<input type="date" onChange={e => this.setState({endDate: e.target.value})}/>
	    		<button onClick={e => this.selectItems("end_date", this.state.endDate)}>Add</button>
	    		<div className="DimensionsMetrics">
		    		<div>
			    		<h2>Dimensions</h2>	
				    		<h3>Time</h3>
				    			<label>Date</label>
					    		<input type="checkbox" value="date" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Day</label>
					    		<input type="checkbox" value="day" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Day of Week</label>
					    		<input type="checkbox" value="day_of_week" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Year</label>
					    		<input type="checkbox" value="year" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    	<h3>Usage</h3>
					    		<label>Day's Alive</label>
					    		<input type="checkbox" value="days_alive" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Storage Type</label>
					    		<input type="checkbox" value="storage_type" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    	<h3>Vendor</h3>
					    		<label>Account ID</label>
					    		<input type="checkbox" value="account_id" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Account Name</label>
					    		<input type="checkbox" value="account_name" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>AMI</label>
					    		<input type="checkbox" value="ami" onClick={e => this.selectItems("Dimension", e.target.value)}/>
					    		<label>Security Group ID's</label>
					    		<input type="checkbox" value="security_group_id" onClick={e => this.selectItems("Dimension", e.target.value)}/>
				    </div>
				    <div>
					    <h2>Metrics</h2>	
				    		<h3>Processing</h3>
				    			<label>Bandwidth In</label>
					    		<input type="checkbox" value="date" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Bandwidth Out</label>
					    		<input type="checkbox" value="day" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Day of Week</label>
					    		<input type="checkbox" value="day_of_week" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Year</label>
					    		<input type="checkbox" value="year" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    	<h3>Usage</h3>
					    		<label>Compute Usage Type</label>
					    		<input type="checkbox" value="compute_usage_type" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Engine</label>
					    		<input type="checkbox" value="engine" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Instance Category</label>
					    		<input type="checkbox" value="instance_category" onClick={e => this.selectItems("Metric", e.target.value)}/>
					    		<label>Instance Family</label>
					    		<input type="checkbox" value="instance_family" onClick={e => this.selectItems("Metric", e.target.value)}/>
					</div>
				</div>
				<DragFrom items={this.state.props} passItemBackToParent={this.passItemBackToParent.bind(this)}/>
				<p>{this.state.generatedUrl}</p>
			</div>
		)
	}
}