/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2018-11-30 15:11:03
 * @LastEditTime: 2020-03-12 16:56:51
 * @github: https://github.com/tianxiangbing
 */
import React from 'react';
import ReactDOM from 'react-dom';
import List from '../src/index';
import '../src/_index';
const {Option} = List;

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  onSelectHandle(item,index){
    console.log(item,index)
  }
  render() {
    return (
      <div>
      <div style={{padding:"10px",border:"1px solid #ccc",height:80,overflow:'auto'}}>
      <List>
        {
          [{text:'demo1'},{text:'demo2'},{text:'demo3'},{text:'demo4'},{text:'demo5'},{text:'demo6'}].map( (item,index)=><Option key={index} onSelect={this.onSelectHandle.bind(this,item,index)}>{item.text}</Option>)
        }
      </List>
      </div>
        <List>
          <Option>aaa</Option>
          <Option>bbb</Option>
          <Option>ccc</Option>
        </List>
        <List onSelect={e=>console.log(e)} showSearch={true} data={[{text:'aaaaa'},{text:'aabb'},{text:'ccddb'},{text:'demo4'},{text:'demo5'},{text:'demo6'}]}></List>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);