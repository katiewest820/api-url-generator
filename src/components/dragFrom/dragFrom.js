import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './dragFrom.css';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class SortableComponent extends React.Component {
	constructor(props){
		super(props);
		console.log(props.items)
  		this.state = {
  			startDate: '',
    		items: props.items,
  		};
  	}

  	onSortEnd = ({oldIndex, newIndex}) => {
    	this.setState({
      	items: arrayMove(this.state.items, oldIndex, newIndex),
    	});
  	};

  render() {
  	console.log(this.state.items)
    return (
    	<div className="dragBox">
	    	<SortableList axis={'x'} items={this.state.items} onSortEnd={this.onSortEnd} />
    	</div>
    )
  }
}
