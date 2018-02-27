import React from 'react'

export default class LiItems extends React.Component{
	constructor(props,context) {
		super(props,context)
	}
    render(){
    	const item=this.props.item;
    	return(
    		<li>
               <p><span>{item.user}</span><span>{item.createdAt}&nbsp;&nbsp;说:</span></p>
               <p>{item.post}</p>
    		</li>
    	)
    }
}
