import React from 'react';

const copyToClipboard = (str) => {
		console.log(str)
	  const el = document.createElement('textarea');
	  el.value = str;
	  document.body.appendChild(el);
	  el.select();
	  document.execCommand('copy');
	  document.body.removeChild(el);
	};

export default class Documentation extends React.Component{

	

	render(){
		return(
			<div>
				<span id="copy-text" onClick={ () => copyToClipboard('I am copied')}>Click</span>
				
			</div>
		)
	}
}