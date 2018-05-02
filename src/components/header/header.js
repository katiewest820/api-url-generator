import React from 'react';
import header from './header.css';
import {Link} from 'react-router-dom';

export default class Header extends React.Component{

	render(){
		return(
			<div className="headerDiv">
				<select>
					<option disabled>Query Type</option>
					<Link to="/report">Report</Link>
					<option>Views</option>
					<option>Users</option>
				</select>
			</div>
		)
	}
}