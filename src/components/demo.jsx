import React, { Component } from 'react';

class Demo extends Component {
    state = { 
        name: '',
        age: 0
     } 

     componentDidMount = () =>{
        this.setState({name:'Abhishek',age:20});
     }
    render() { 
        const {name,age} = this.state;
        return (
            <h1 className='demo'>This is a demo - {name} {age}</h1>
        );
    }
}
 
export default Demo;