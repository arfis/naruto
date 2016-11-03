import React, { Component } from 'react';


class Window extends Component {
componentDidMount(){
}

onClickHandler(){
	this.props.onClick(this.props);
}

render(){
	var borderColor = (this.props.filler === true) ? 'black' : '#ca0015';
	return(
		
		<div className='window-video' onClick={this.onClickHandler.bind(this)} style={{borderColor: borderColor}}> 
			<div className='part-number'>{this.props.part}</div>
			<div className='window-title'>
			{this.props.title}{this.props.filler}	 
	    	</div>
	    </div>
		);
	}
}

export default Window;
