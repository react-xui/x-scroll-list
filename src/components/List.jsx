/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-list
 * User: 田想兵
 * Date: 2018-11-30
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import PropTypes from "prop-types";
export default class List extends Component {
  static displayName="ScrollList";
  static propTypes = {
    data: PropTypes.array,
    children: PropTypes.node,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    field: {
      text: 'text',
      value: 'value'
    },
    onSelect: () => { }
  }
  static Option = Option;
  constructor(props) {
    super(props);
    this.state = { searchKey :''};
  }
  onSearch = (e) => {
    let value = e.target.value;
    this.setState({searchKey:value})
  }
  searchRender() {
    let { showSearch } = this.props;
    return showSearch ? <div className="x-list-search"><input className="x-list-search-input" type="text" onChange={this.onSearch} /></div> : undefined
  }
  onSelect = (item, index) => {
    let { onSelect } = this.props;
    onSelect(item, index)
  }
  //渲染options，判断是data还是直接children
  renderChildren() {
    let { data, children, field, onSelect } = this.props;
    if (data && data.length > 0) {
      return data.filter(item=>{
        return item.text.indexOf(this.state.searchKey) >-1
      }).map((item, index) => {
        return <Option key={index} onSelect={this.onSelect.bind(this, item, index)}>{item[field.text]}</Option>
      })
    } else {
      return children;
    }
  }
  render() {
    // console.log(123)
    let { children, isLoadMore, onSelect, showSearch, className } = this.props;
    let cls = (className || "") + ' x-list';
    let { data } = this.state;
    return (
      <div className={cls}>
        {this.searchRender()}
        <div className="x-list-options">
          {this.renderChildren()}
        </div>
        {
          isLoadMore ? <div>load</div> : undefined
        }
      </div>
    );
  }
}
