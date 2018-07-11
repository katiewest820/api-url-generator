import React from 'react';
import {costMetrics} from '../metrics_dimensions/metrics';
import {costDimensions} from '../metrics_dimensions/dimensions';
import './toggleFilters.css';

export default class ToggleFilters extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: false,
			parameter: '',
			selectedFilter: '',
			parameterInput: ''
		}
	}

	passFilterBackToReport(){
		this.props.addFilter(this.state.parameter, this.state.parameterInput, this.state.selectedFilter);
		this.setState({active: false});
	}

	
	render(){
		if(this.state.active == true){
			let filterDimensionOptions = costDimensions.map((item, index) => {
	    		return <option value={item.value} onClick={e => this.setState({parameter: e.target.value})}>{item.label}</option>
			})
			let filterMetricOptions = costMetrics.map((item, index) => {
				return <option value={item.value} onClick={e => this.setState({parameter: e.target.value})}>{item.label}</option>
			})
			return(
				<div className="filterDiv">
					<button className="close" onClick={e => this.setState({active: false})}><i class="fas fa-times"></i></button>
	    			<select value={this.state.parameter} onChange={e => this.setState({parameter: e.target.value})}>
	    				<option></option>
	    				{filterDimensionOptions}
	    				{filterMetricOptions}
	    			</select>
	    			
	    			<select value={this.state.selectedFilter} onChange={e => this.setState({selectedFilter: e.target.value})}>
	    				<option></option>
	    				<option value="==" onClick={e => this.setState({selectedFilter: e.target.value})}>equals</option>
	    				<option value="!=" onClick={e => this.setState({selectedFilter: e.target.value})}>not equals</option>
	    				<option value="<" onClick={e => this.setState({selectedFilter: e.target.value})}>less than</option>
	    				<option value=">" onClick={e => this.setState({selectedFilter: e.target.value})}>greater than</option>
	    				<option value="<=" onClick={e => this.setState({selectedFilter: e.target.value})}>less than or equals</option>
	    				<option value=">=" onClick={e => this.setState({selectedFilter: e.target.value})}>greater than or equals</option>
	    				<option value="=@" onClick={e => this.setState({selectedFilter: e.target.value})}>contains</option>
	    				<option value="!=@" onClick={e => this.setState({selectedFilter: e.target.value})}>does not contain</option>
	    			</select>
	    			<input type="text" onChange={e => this.setState({parameterInput: e.target.value})}/>
	    			<button className="add" onClick={this.passFilterBackToReport.bind(this)}>Add</button>
	    			
	    		</div>
	    	)} else {
	    		return(
	    			<div onClick={e => this.setState({active: true})}>
	    				Add Filter <i className="fas fa-plus-circle"></i>
	    			</div>)
	    	}
		
	}
}