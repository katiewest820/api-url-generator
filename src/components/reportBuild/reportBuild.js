import React from 'react';
import './reportBuild.css'
import DragFrom from '../dragFrom/dragFrom';


export default class ReportBuild extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: 'v1',
			reportType: '',

		}
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
				<DragFrom/>
				<button>Submit</button>
			</div>
		)
	}
}