import React from 'react';
import './documentation.css';

export default class Documentation extends React.Component{

	render(){
		return(
			<div className="docsDiv">
				<div className="v2">
					<p>How to use this app</p>
					<ul>
						<li>Generate a report url from the cost or utilization tabs.</li> 
						<li>Click on the report url once all additions have been made.</li>
						<li>Navigate to a terminal window and make GET request with url.</li>
						<li>An response with an ID will be returned. This ID is your key to check on the status and retrieve your report.</li>
						<li>To retrieve your report run: https://app.cloudability.com/api/2/reporting/compare/reports/YOUR ID/results</li>
					</ul>
				</div>
				<div className="additional">
					<p>Additional Resources</p>
				</div>
				<div className="v1">
					<span>The Cloudability <a href='https://developers.cloudability.com/v1.0/docs/cloudability-api-v1' target="_blank">V1 API</a> supports the following features:</span>
					<ul>
						<li>V1 Cost Reports</li>
						<li>V1 Utilization Reports</li>
						<li>Account Groups</li>
						<li>Organization Changes</li>
						<li>User Changes</li>
					</ul>
				</div>
				<div className="v3">
					<span>The Cloudability <a href='https://developers.cloudability.com/v3.0/docs' target="_blank">V3 API</a> supports the following features:</span>
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
			</div>
		)
	}
}