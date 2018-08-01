import React from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './dragFrom.css';


export default class SortableComponent extends React.Component {
	constructor(props){
		super(props);
		console.log(props)
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
      
      console.log(this.state.labels)

      this.props.passItemBackToParent(this.state.items, "")
      this.props.passLabelBackToParent(this.state.labels, this.state.indexVal);

  	};



    onRemove(index){
      console.log(index)
      let deletedValue = this.state.items[index];
      console.log(deletedValue)
      this.state.items.splice(index,1);
      this.state.labels.splice(index, 1);
      this.state.indexVal.splice(index, 1);
      this.setState({
          items : this.state.items, 
          indexVal: this.state.indexVal,
          labels: this.state.labels
      });
     
      this.props.passItemBackToParent(this.state.items, deletedValue)
      this.props.passLabelBackToParent(this.state.labels, this.state.indexVal);
    }

  render() {
    console.log(this.state)
    console.log(this.state.indexVal)
  
    let SortableItem = SortableElement(({value, onRemove}) => {
      let matchingIndex = this.state.items.findIndex(index => index == value)
      console.log(matchingIndex)
      console.log(this.state.labels)
      let label = this.state.labels[matchingIndex];
      console.log(label)
      return (
        <li className="sortableItemLi">
          {label}
          <button className="deleteButton fas fa-times" key={`input-${value}`} onClick={() => this.onRemove(matchingIndex)}></button>
        </li>
      );
    });

    let SortableList = SortableContainer(({items, onRemove, labels}) => {
    console.log(items)
    console.log(labels)
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
  	console.log(this.state)
    console.log(this.props)
    return (
    	<div className="dragBox">
	    	<SortableList axis={'x'} items={this.props.items} onSortEnd={this.onSortEnd} onRemove={(index) => this.remove(index)} labels={this.props.labels}/>
    	</div>
    )
  }
}
