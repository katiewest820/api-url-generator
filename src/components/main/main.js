import React from 'react';
import './main.css'

export default class Main extends React.Component{
	constructor(){
		super();
		this.state = {
			apiVersion: '',
			reportType: ''
		}
	}

	render(){
		return(
			<div className="mainDiv">
				<select>
					<option></option>
					<option>V1</option>
					<option>V3</option>
				</select>
				<select>
					<option></option>
					<option>Cost Report</option>
					<option>Utilization Report</option>
				</select>
			</div>
		)
	}
}