import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './dragFrom.css';

export default class SortableComponent extends React.Component {
	constructor(props){
		super(props);
  		this.state = {
  			startDate: '',
    		items: props.items,
        indexVal: props.indexVal,
        labels: props.labels
  		};

  	}

  	onSortEnd = ({oldIndex, newIndex}) => {
    	this.setState({
      	items: arrayMove(this.props.items, oldIndex, newIndex),
        indexVal: arrayMove(this.state.indexVal, oldIndex, newIndex),
        labels: arrayMove(this.state.labels, oldIndex, newIndex)
    	});

      this.props.passItemBackToParent(this.state.items, "");
      this.props.passLabelBackToParent(this.state.labels, this.state.indexVal);
  	};



    onRemove(index){
      let deletedValue = this.state.items[index];
      this.state.items.splice(index, 1);
      this.state.labels.splice(index, 1);
      this.state.indexVal.splice(index, 1);
      this.setState({
          indexVal: this.state.indexVal,
          labels: this.state.labels,
          items : this.state.items,
      });
     
      this.props.passItemBackToParent(this.state.items, deletedValue)
      this.props.passLabelBackToParent(this.state.labels, this.state.indexVal);
    }

  render() {
    let SortableItem = SortableElement(({value, onRemove}) => {
      let matchingIndex = this.state.items.findIndex(index => index == value);
      let label = this.state.labels[matchingIndex];
      return (
        <li className="sortableItemLi">
          {label}
          <button className="deleteButton fas fa-times" key={`input-${value}`} onClick={() => this.onRemove(matchingIndex)}></button>
        </li>
      );
    });

    let SortableList = SortableContainer(({items, onRemove, labels}) => {
      return (
        <ul>
          {items.map((value, index, onRemove) => (
              <SortableItem 
                key={`item-${index}`} 
                index={index} 
                value={value}
                onClick={() => onRemove(index)} 
              />
          ))}
        </ul>
      );
    });
    
    return (
    	<div className="dragBox">
	    	<SortableList axis={'x'} items={this.props.items} onSortEnd={this.onSortEnd} onRemove={(index) => this.remove(index)} labels={this.props.labels}/>
    	</div>
    )
  }
}
