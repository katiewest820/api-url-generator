import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './dragFrom.css';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  console.log(items)
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
		console.log(props)
  		this.state = {
  			startDate: '',
    		items: props.items,
  		};
  	}

  	onSortEnd = ({oldIndex, newIndex}) => {
    	this.setState({
      	items: arrayMove(this.props.items, oldIndex, newIndex),
    	});
      this.props.passItemBackToParent(this.state.items)
  	};



  render() {
  	console.log(this.state)
    console.log(this.props)
    return (
    	<div className="dragBox">
	    	<SortableList axis={'x'} items={this.props.items} onSortEnd={this.onSortEnd}/>
    	</div>
    )
  }
}
