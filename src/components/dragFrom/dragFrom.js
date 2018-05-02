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
	constructor(){
		super();
  		this.state = {
  			options: [],
    		items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  		};
  	}

  	selectItems(item){
  		console.log(item)
  		let newItemsList = this.state.items.push(item)
  		console.log(newItemsList)
  	}

  	onSortEnd = ({oldIndex, newIndex}) => {
    	this.setState({
      	items: arrayMove(this.state.items, oldIndex, newIndex),
    	});
  	};
  render() {
    return (
    	<div>
	    	<label>Item 1</label>
	    		<input type="checkbox" value="Item 1" onClick={e => this.selectItems(e.target.value)}/>
	    	<label>Item 2</label>
	    		<input type="checkbox" value="Item 2"/>
	    	<SortableList axis={'x'} items={this.state.items} onSortEnd={this.onSortEnd} />
    	</div>
    )
  }
}
