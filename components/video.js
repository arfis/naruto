import React, { Component } from 'react';


class Video extends Component {
componentDidMount(){
}

onClickHandler(){
	this.props.onClick(this.props.title);
}

render(){
	var link = 'http://rasengan.cz/shippuuden/'+this.props.data.part;
	return(
		
		<div className='video-screen'>
			<button onClick={this.onClickHandler.bind(this)}>&#8626;Back</button>
			{this.props.data.title}
			 <iframe src={link}></iframe> 
		</div>
		);
	}
}

export default Video;
