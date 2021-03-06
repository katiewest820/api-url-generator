import React from 'react';
import './toggleParams.css';
import {costMetrics, utilMetrics} from '../metrics_dimensions/metrics';
import {costDimensions, utilDimensions} from '../metrics_dimensions/dimensions';

export default class ToggleParams extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: false,
			sortParameter: '',
			sortParameterInput: '',
			orderParameter: '',
			orderParameterInput: '',
			parameter: '',
			parameterInput: '',
			reportType: props.reportType
		}
	}

	passParameterToReport(){
		if(this.state.sortParameter.length > 0){
			this.props.addParameter(this.state.sortParameter, this.state.sortParameterInput);
			this.setState({sortParameter: ''});
			this.setState({sortParameterInput: ''});
		}
		if(this.state.orderParameter.length > 0){
			this.props.addParameter(this.state.orderParameter, this.state.orderParameterInput);
			this.setState({orderParameter: ''});
			this.setState({orderParameterInput: ''});
		}
		if(this.state.parameterInput.length > 0){
			this.props.addParameter(this.state.parameter, this.state.parameterInput);
			this.setState({parameter: ''});
			this.setState({parameterInput: ''});
		}
		this.setState({active: false})
	}

	sortBy(value){
		this.setState({sortParameterInput: value});
		this.setState({sortParameter: "sort_by"});
	}

	orderBy(value){
		this.setState({orderParameterInput: value});
		this.setState({orderParameter: "order"});
	}

	render(){
		if(this.state.active == true){
			let dimensionsDataSource;
			let metricsDataSource;
			if(this.state.reportType == 'cost'){
				dimensionsDataSource = costDimensions;
				metricsDataSource = costMetrics;
			}else{
				dimensionsDataSource = utilDimensions;
				metricsDataSource = utilMetrics;
			}
			let filterDimensionOptions = dimensionsDataSource.map((item, index) => {
	    		return <option value={item.value} >{item.label}</option>
			})
			let filterMetricOptions = metricsDataSource.map((item, index) => {
				return <option value={item.value} >{item.label}</option>
			})
			return(
				<div>
					<div onClick={e => this.setState({active: true})} className="addParameterButton">
						<p>Add Parameters</p>
	    				<i className="fa fa-plus-circle fa-2x"></i>
	    			</div>
		    		<div className="paramDiv">
		    			<button className="close" onClick={e => this.setState({active: false})}><i className="fas fa-times"></i></button>

		    			<label className="paramsLabel">Params</label>
			    			<select value={this.state.parameter} onChange={e => this.setState({parameter: e.target.value})}>
			    				<option></option>
			    				<option value="offset" onClick={e => this.setState({parameter: e.target.value})}>Ofset (number)</option>
			    				<option value="max_results" onClick={e => this.setState({parameter: e.target.value})}>Max Results (number)</option>
			    			</select>
		    				<input type="text" onChange={e => this.setState({parameterInput: e.target.value})}/>
		    				<button className="filterSubmit" onClick={this.passParameterToReport.bind(this)}>Submit</button>
		    			
		    			<label className="sortByLabel">Sort By</label>
			    			<select onChange={e => this.sortBy(e.target.value)}>
			    				<option></option>
			    				{filterMetricOptions}
			    				{filterDimensionOptions}
			    			</select>
			    			<select onChange={e => this.orderBy(e.target.value)}>
			    				<option></option>
			    				<option value="asc">Asc</option>
			    				<option value="desc">Desc</option>
			    			</select>
			    			<button className="filterSubmit" onClick={this.passParameterToReport.bind(this)}>Submit</button>
		    			
					</div>	
				</div>
			)
		} else {
			return(
    			<div onClick={e => this.setState({active: true})} className="addParameterButton">
    				<p>Add Parameters</p>
    				<i className="fa fa-plus-circle fa-2x"></i>
    			</div>
    		)
		}
	}
}