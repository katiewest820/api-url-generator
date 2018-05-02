import React from 'react';
import './reportBuild.css'
import DragFrom from '../dragFrom/dragFrom';


export default class ReportBuild extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'v1',
			reportType: '',
			startDate: '',
			props: []
		}
	}

	selectItems(key, value){
  		console.log(value)
  		console.log(key)
  		this.state.props.push(`${key}: ${value}`);
  		let newItemsList = this.state.props;
  		this.setState({startDate: ''});
  		console.log(newItemsList);
  	}

	render(){
		console.log(this.state)
		return(
			<div className="reportBuildDiv">
				<select value={this.state.reportType} onChange={e => this.setState({reportType: e.target.value})}>
					<option></option>
					<option value="cost">Cost Report</option>
					<option value="utilization">Utilization Report</option>
				</select>

				<label>Start Date</label>
	    		<input type="date" onChange={e => this.setState({startDate: e.target.value})}/>

	    		<button onClick={e => this.selectItems("Start Date", this.state.startDate)}>Add</button>

	    		<h1>Dimensions</h1>	
		    		<h3>Time</h3>
		    			<label>Date</label>
			    		<input type="checkbox" value="Date" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Day</label>
			    		<input type="checkbox" value="Day" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Day of Week</label>
			    		<input type="checkbox" value="Day of Week" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Year</label>
			    		<input type="checkbox" value="Year" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    	<h3>Usage</h3>
			    		<label>Compute Usage Type</label>
			    		<input type="checkbox" value="Compute Usage Type" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Engine</label>
			    		<input type="checkbox" value="Engine" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Instance Category</label>
			    		<input type="checkbox" value="Instance Category" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Instance Family</label>
			    		<input type="checkbox" value="Instance Family" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    	<h3>Vendor</h3>
			    		<label>Account ID</label>
			    		<input type="checkbox" value="Account ID" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Account Name</label>
			    		<input type="checkbox" value="Account Name" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Availability Zone</label>
			    		<input type="checkbox" value="Availability Zone" onClick={e => this.selectItems("Dimension", e.target.value)}/>
			    		<label>Item Description</label>
			    		<input type="checkbox" value="Item Description" onClick={e => this.selectItems("Dimension", e.target.value)}/>
				<DragFrom items={this.state.props}/>
				
			</div>
		)
	}
}