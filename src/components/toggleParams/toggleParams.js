import React from 'react';

export default class ToggleParams extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: false,
			parameter: '',
			parameterInput: ''
		}
	}

	passParameterToReport(){
		this.props.addParameter(this.state.parameter, this.state.parameterInput)
		this.setState({active: false})
	}

	render(){
		if(this.state.active == true){
			return(
	    		<div className="paramDiv">
	    			<label>Parameters:
	    			<select value={this.state.parameter} onChange={e => this.setState({parameter: e.target.value})}>
	    				<option></option>
	    				<option value="sort_by" onClick={e => this.setState({parameter: e.target.value})}>Sort By</option>
	    				<option value="order" onClick={e => this.setState({parameter: e.target.value})}>Order (asc or desc)</option>
	    				<option value="offset" onClick={e => this.setState({parameter: e.target.value})}>Ofset (number)</option>
	    				<option value="max_results" onClick={e => this.setState({parameter: e.target.value})}>Max Results (number)</option>
	    			</select>
	    			</label>
	    			<input type="text" onChange={e => this.setState({parameterInput: e.target.value})}/>
	    			<button onClick={this.passParameterToReport.bind(this)}>Add</button>
	    			<button onClick={e => this.setState({active: false})}>Cancel</button>
				</div>	
			)
		} else {
			return(
    			<div onClick={e => this.setState({active: true})}>
    				Add Parameters <i className="fas fa-plus-circle"></i>
    			</div>
    		)
		}
	}
}