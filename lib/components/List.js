'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with Visual Studio Code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * github: https://github.com/React-xui/x-scroll-list
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: 田想兵
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2018-11-30
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 20:00:00
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Contact: 55342775@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    _initialiseProps.call(_this);

    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = { showPager: false, value: value };
    _this.containerRef = _react2.default.createRef();
    _this.listRef = _react2.default.createRef();
    return _this;
  }

  _createClass(List, [{
    key: 'renderChildren',

    //渲染options，判断是data还是直接children
    value: function renderChildren() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          children = _props.children,
          field = _props.field;

      if (data && data.length > 0) {
        return data.map(function (item, index) {
          var value = item[field.value];
          var selected = false;
          if (_this2.state.value == value) {
            selected = true;
          }
          return _react2.default.createElement(
            _Option2.default,
            { selected: selected, key: index, value: value, onSelect: _this2.onSelect.bind(_this2, value, item, index) },
            item[field.text]
          );
        });
      } else {
        return _react2.default.Children.map(children, function (item, index) {
          var _data;

          var props = _extends({}, item.props);
          var data = (_data = {}, _defineProperty(_data, field.value, props.value), _defineProperty(_data, field.text, props.children), _data);
          props.onSelect = _this2.onSelect.bind(_this2, props.value, data, index);
          if (_this2.state.value == props.value) {
            props.selected = true;
          }
          return _react2.default.cloneElement(item, props);
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkWidth();
      window.addEventListener('resize', this.checkWidth.bind(this), false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.checkWidth.bind(this), false);
    }
  }, {
    key: 'checkWidth',
    value: function checkWidth() {
      //判断长度
      var container = this.containerRef;
      var list = this.listRef;
      var wc = container.offsetWidth;
      var wl = list.scrollWidth;
      // console.log(container,list);
      // console.log(wc,wl)
      if (wl > wc) {
        this.setState({ showPager: true });
      }
    }
  }, {
    key: 'scroll',
    value: function scroll(forward) {
      var step = this.props.step * forward;
      var container = this.containerRef;
      window.container = container;
      container.scroll(container.scrollLeft + step, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // console.log(123)
      var _props2 = this.props,
          children = _props2.children,
          onSelect = _props2.onSelect,
          showSearch = _props2.showSearch,
          className = _props2.className;
      var showPager = this.state.showPager;

      var cls = (className || "") + ' x-scroll-list';
      var data = this.state.data;

      return _react2.default.createElement(
        'div',
        { className: cls },
        showPager && _react2.default.createElement('i', { className: 'xui icon-last x-scroll-list-page', onClick: this.scroll.bind(this, -1) }),
        _react2.default.createElement(
          'div',
          { className: 'x-scroll-list-container', ref: function ref(_ref2) {
              return _this3.containerRef = _ref2;
            } },
          _react2.default.createElement(
            'div',
            { className: 'x-scroll-list-options', ref: function ref(_ref) {
                return _this3.listRef = _ref;
              } },
            this.renderChildren()
          )
        ),
        showPager && _react2.default.createElement('i', { className: 'xui icon-next1 x-scroll-list-page', onClick: this.scroll.bind(this, 1) })
      );
    }
  }]);

  return List;
}(_react.Component);

List.displayName = "ScrollList";
List.propTypes = {
  data: _propTypes2.default.array,
  children: _propTypes2.default.node,
  onSelect: _propTypes2.default.func
};
List.defaultProps = {
  field: {
    text: 'text',
    value: 'value'
  },
  onChange: function onChange() {},
  step: 40
};
List.Option = _Option2.default;

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onSelect = function (value, item, index, e) {
    var target = e.currentTarget;
    var x = target.offsetLeft;
    var container = _this4.containerRef;
    var wc = container.offsetWidth;
    // let sl = this.containerRef.scrollLeft;
    var sc = x - wc / 2 + target.offsetWidth / 2;
    container.scroll(sc, 0);
    // console.log(this.containerRef.scrollLeft,x)
    var onChange = _this4.props.onChange;

    _this4.setState({ value: value }, function () {
      onChange.call(_this4, value, item, index);
    });
  };
};

exports.default = List;