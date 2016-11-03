import React, { Component } from 'react';
import Window from './window';
import Video from './video';
import axios from 'axios';

let setStateGlobal = function(data){
}
class List extends Component {

constructor(props){
		super(props);

		this.state = {tittleArray: null,
					  showFillers: true,
					  keyword: null,
					  selected : null};	
}

handleClick(){
	console.log('clicked');
	var showFillers = this.state.showFillers;
	this.setState({showFillers : !showFillers});
}

 componentDidMount() {
 	var windows = [];
	var config = {
	    headers: {
	             'Content-Type': 'application/json',
	             'Access-Control-Allow-Headers':'*',
	             'Access-Control-Allow-Origin' : 'localhost:3000',
	             'X-Requested-With': 'XMLHttpRequest'
	    },
	};


	axios.get('/test')
	  	.then(response=> {
	  	var titles = [];

	    titles = response.data;
		this.setState({tittleArray : titles});

	  })
	  .catch(function (error) {
	    console.log(error);
	  });

}

contains(title, word){
	return (title.indexOf(word) !== -1) ? true : false;
}

handleChange(event){
	this.setState({keyword : event.target.value});
	console.log('change ' + this.state.keyword);
}

handleSelectionClick(id){
	console.log('clicked ' + id);
	this.setState({selected : id});
}

handleClickBack(){
	this.setState({selected : null});
}
render(){

		var windows = [];
		var titles = this.state.tittleArray;
		var showFillers = this.state.showFillers;
		var keyword = this.state.keyword;
		var selected = this.state.selected;

		if(titles != null){
			titles.forEach((value, index)=>{
	
				var title = value.title;
				if (showFillers === true || (showFillers === false && value.filler === false)){
					
					if ((keyword !== null && this.contains(title, keyword) || keyword === null)){
						windows.push(<Window onClick={this.handleSelectionClick.bind(this)} link={value.link} part={value.part} title={title} filler={value.filler} key={index}/>);
					}

				}
			});
		}
	if (selected === null){
		return(
		<div>
			<div className='control-panel'>
				<div className='controls'>
					<button onClick={this.handleClick.bind(this)}>{this.state.showFillers === true ? 'hide fillers' : 'show fillers'}</button>
					<input onChange={this.handleChange.bind(this)}/>
				</div>
			</div>
			<div className='video-list'>
				{windows}
			</div>
		</div>);
	}
	else
		return(
		<div>
			<div className='main'>
				<Video data={this.state.selected} onClick={this.handleClickBack.bind(this)}/>
			</div>
		</div>);
}
	
}
export default List