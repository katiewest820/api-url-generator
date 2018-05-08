import React from 'react';
import './reportBuild.css'
import CostReport from '../costReport/costReport';
import UtilReport from '../utilReport/utilReport';

export default class ReportBuild extends React.Component{
	constructor(){
		super()
		this.state = {
			reportType: ''
		}
	}

	

	render(){
		console.log(this.state)
		if(this.state.reportType == 'cost' || this.state.reportType == ''){
			return(
				<div>
					<select value={this.state.reportType} onChange={e => this.setState({reportType: e.target.value})}>
						<option></option>
						<option value="cost" onClick={e => this.setState({reportType: 'cost'})}>Cost Report</option>
						<option value="utilization" onClick={e => this.setState({reportType: 'util'})}>Utilization Report</option>
					</select>
					<CostReport/>
					
				</div>
			)
		} else {
			return (
				<div>
					<select value={this.state.reportType} onChange={e => this.setState({reportType: e.target.value})}>
						<option></option>
						<option value="cost" onClick={e => this.setState({reportType: 'cost'})}>Cost Report</option>
						<option value="utilization" onClick={e => this.setState({reportType: 'util'})}>Utilization Report</option>
					</select>
					<UtilReport/>
					
				</div>
			)
		}
		
	}
}