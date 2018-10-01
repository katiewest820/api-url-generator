import React from 'react';

export default class Documentation extends React.Component{

	render(){
		return(
			<div>
				<a href='https://developers.cloudability.com/v1.0/docs/cloudability-api-v1' target="_blank">V1 Cloudability API Docs</a>
				<p>The Cloudability V1 API supports the following features:</p>
				<ul>
					<li>V1 Cost Reports</li>
					<li>V1 Utilization Reports</li>
					<li>Account Groups</li>
					<li>Organization Changes</li>
					<li>User Changes</li>
				</ul>
				<a href='https://developers.cloudability.com/v3.0/docs' target="_blank">V3 Cloudability API Docs</a>
				<p>The Cloudability V3 API supports the following features:</p>
				<ul>
					<li>Vendor Credentials</li>
					<li>Views</li>
					<li>Rightsizing</li>
					<li>Anomaly Detection</li>
					<li>Workload Placement</li>
					<li>RI Portfolio</li>
					<li>RI Planner</li>
					<li>Rightsizing</li>
					<li>Budgets & Forecasting</li>
					<li>Collections</li>
				</ul>
				

				
			</div>
		)
	}
}