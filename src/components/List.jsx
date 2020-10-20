/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-scroll-list
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
  static displayName = "ScrollList";
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
    onChange: () => { },
    step:40,
  }
  static Option = Option;
  constructor(props) {
    super(props);
    let value = typeof props.value==='undefined'?props.defaultValue:props.value;
    this.state = { showPager:false ,value: value};
    this.containerRef  = React.createRef();
    this.listRef  = React.createRef();
  }
  onSelect = (value, item, index,e) => {
    let target = e.currentTarget;
    let x = target.offsetLeft;
    let container = this.containerRef;
    let wc = container.offsetWidth;
    // let sl = this.containerRef.scrollLeft;
    let sc = x - wc/2 + target.offsetWidth/2 ;
    container.scroll(sc,0)
    // console.log(this.containerRef.scrollLeft,x)
    let { onChange } = this.props;
    this.setState({value},()=>{
      onChange.call(this, value, item, index);
    })
  }
  //渲染options，判断是data还是直接children
  renderChildren() {
    let { data, children, field } = this.props;
    if (data && data.length > 0) {
      return data.map((item, index) => {
        let value = item[field.value];
        let selected = false;
        if(this.state.value ==value){
          selected = true;
        }
        return <Option selected={selected} key={index} value={value} onSelect={this.onSelect.bind(this,value , item, index)}>{item[field.text]}</Option>
      })
    } else {
      return React.Children.map(children, (item, index) => {
        let props = { ...item.props }
        let data = { [field.value]: props.value, [field.text]: props.children };
        props.onSelect = this.onSelect.bind(this, props.value, data, index);
        if(this.state.value == props.value){
          props.selected = true;
        }
        return React.cloneElement(item, props);
      })
    }
  }
  componentDidMount() {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth.bind(this), false);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.checkWidth.bind(this), false);
  }
  checkWidth(){
    //判断长度
    let container = this.containerRef;
    let list = this.listRef;
    let wc = container.offsetWidth;
    let wl = list.scrollWidth;
    // console.log(container,list);
    // console.log(wc,wl)
    if(wl>wc){
      this.setState({showPager:true})
    }
  }
  scroll(forward){
    let step = this.props.step * forward;
    let container = this.containerRef;
    window.container = container
    container.scroll(container.scrollLeft + step,0)
  }
  render() {
    // console.log(123)
    let { children, onSelect, showSearch, className } = this.props;
    let {showPager} = this.state;
    let cls = (className || "") + ' x-scroll-list';
    let { data } = this.state;
    return (
      <div className={cls}>
      {showPager&&<i className="xui icon-last x-scroll-list-page" onClick={this.scroll.bind(this,-1)}/>}
        <div className="x-scroll-list-container" ref={ref=>this.containerRef=ref}>
          <div className="x-scroll-list-options" ref={ref=>this.listRef=ref}>
            {this.renderChildren()}
          </div>
        </div>
      {showPager&&<i className="xui icon-next1 x-scroll-list-page" onClick={this.scroll.bind(this,1)}/>}
      </div>
    );
  }
}
