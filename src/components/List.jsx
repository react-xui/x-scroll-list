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
export default class List extends React.PureComponent {
  static displayName = "ScrollList";
  static propTypes = {
    dataSource: PropTypes.array,
    children: PropTypes.node,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    field: {
      text: 'text',
      value: 'value'
    },
    onChange: () => { },
    step: 40,
  }
  static Option = Option;
  constructor(props) {
    super(props);
    let value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = { showPager: false, value: value };
    this.containerRef = React.createRef();
    this.listRef = React.createRef();//把dom与value值进行对应;
  }
  onSelect = (value, item, index, e) => {
    let target = e.currentTarget;
    this.scrollTo(target);
    // console.log(this.containerRef.scrollLeft,x)
    let { onChange } = this.props;
    this.setState({ value }, () => {
      onChange.call(this, value, item, index);
    })
  }
  scrollTo(target){
    let x = target.offsetLeft;
    let container = this.containerRef.current;
    let wc = container.offsetWidth;
    // let sl = this.containerRef.scrollLeft;
    let sc = x - wc / 2 + target.offsetWidth / 2;
    container.scroll(sc, 0)
  }
  //渲染options，判断是data还是直接children
  renderChildren() {
    let { dataSource, children, field } = this.props;
    if (dataSource && dataSource.length > 0) {
      return dataSource.map((item, index) => {
        let value = item[field.value];
        let selected = false;
        if (this.state.value == value) {
          selected = true;
        }
        return <Option selected={selected} key={index} value={value} onSelect={this.onSelect.bind(this, value, item, index)}>{item[field.text]}</Option>
      })
    } else {
      return React.Children.map(children, (item, index) => {
        let props = { ...item.props }
        let data = { [field.value]: props.value, [field.text]: props.children };
        props.onSelect = this.onSelect.bind(this, props.value, data, index);
        if (this.state.value == props.value) {
          props.selected = true;
        }
        return React.cloneElement(item, props);
      })
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState({ value: newProps.value }, () => {
        let obj = {}, index = -1;
        this.props.dataSource.forEach((item, i) => {
          if (item.value === newProps.value) {
            obj = item;
            index = i;
          }
        });
        this.props.onChange.call(this, newProps.value, obj, index);
        //定位
        if(this.listRef.current){
          let cl = this.listRef.current.children[index];
          if(cl){
            this.scrollTo(cl);
          }
        }
      });
    }
    if(newProps.dataSource && newProps.dataSource.length !==this.props.dataSource.length){
      this.checkWidth();
    }
  }
  componentDidMount() {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth.bind(this), false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWidth.bind(this), false);
  }
  componentDidUpdate() {
    this.checkWidth();
  }
  checkWidth() {
    //判断长度
    let container = this.containerRef.current;
    let list = this.listRef.current;
    if (container && list) {
      let wc = container.offsetWidth;
      let wl = list.scrollWidth;
      // console.log(container,list);
      // console.log(wc,wl)
      this.setState({ showPager: wl > wc })
    }
  }
  scroll(forward) {
    let step = this.props.step * forward;
    let container = this.containerRef.current;
    window.container = container
    container.scroll(container.scrollLeft + step, 0)
  }
  render() {
    // console.log(123)
    let { className } = this.props;
    let { showPager } = this.state;
    let cls = (className || "") + ' x-scroll-list';
    return (
      <div className={cls}>
        {showPager && <i className="xui icon-last x-scroll-list-page" onClick={this.scroll.bind(this, -1)} />}
        <div className="x-scroll-list-container" ref={this.containerRef}>
          <div className="x-scroll-list-options" ref={ this.listRef }>
            {this.renderChildren()}
          </div>
        </div>
        {showPager && <i className="xui icon-next1 x-scroll-list-page" onClick={this.scroll.bind(this, 1)} />}
      </div>
    );
  }
}
