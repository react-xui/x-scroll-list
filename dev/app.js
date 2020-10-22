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
const { Option } = List;

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {v:[]}
  }
  onSelectHandle(value,item, index) {
    console.log(arguments)
  }
  componentDidMount(){
    this.setState({v:[{ text: 'aaaaa' ,value:'AAA'}, { text: 'aabb' ,value:'BBBB'}, { text: 'ccddb' }, { text: 'demo4' }, { text: 'demo5' }, { text: 'demo6' }]})
  }
  render() {
    return (
      <div>
        <div style={{ width: 200 }}>
          <List onChange={this.onSelectHandle.bind(this)}>
            {
              [{ text: 'demo1' ,value:"ddd"}, { text: 'demo2' ,value:'BBBB'}, { text: 'demo3' }, { text: 'demo4' }, { text: 'demo5' }, { text: 'demo6' }].map((item, index) => <Option key={index} value={item.value}>{item.text}</Option>)
            }
          </List>
        </div>
        <div style={{ width: 200 }}>
          <List onChange={this.onSelectHandle.bind(this)}>
            <Option value="AAAA">aaa</Option>
            <Option value="BBBB">bbb</Option>
            <Option>ccc</Option>
          </List>
        </div>
        <div style={{ width: 200 }}>
          <List value={this.state.value} onChange={this.onSelectHandle.bind(this)} dataSource={this.state.v}></List>
          <button onClick={()=>{
            this.setState({value:'BBBB'})
          }}>设置</button>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);