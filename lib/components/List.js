'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with Visual Studio Code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * github: https://github.com/React-xui/x-list
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

    _this.onSearch = function (e) {
      var value = e.target.value;
      _this.setState({ searchKey: value });
    };

    _this.onSelect = function (item, index) {
      var onSelect = _this.props.onSelect;

      onSelect(item, index);
    };

    _this.state = { searchKey: '' };
    return _this;
  }

  _createClass(List, [{
    key: 'searchRender',
    value: function searchRender() {
      var showSearch = this.props.showSearch;

      return showSearch ? _react2.default.createElement(
        'div',
        { className: 'x-list-search' },
        _react2.default.createElement('input', { className: 'x-list-search-input', type: 'text', onChange: this.onSearch })
      ) : undefined;
    }
  }, {
    key: 'renderChildren',

    //渲染options，判断是data还是直接children
    value: function renderChildren() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          children = _props.children,
          field = _props.field,
          onSelect = _props.onSelect;

      if (data && data.length > 0) {
        return data.filter(function (item) {
          return item.text.indexOf(_this2.state.searchKey) > -1;
        }).map(function (item, index) {
          return _react2.default.createElement(
            _Option2.default,
            { key: index, onSelect: _this2.onSelect.bind(_this2, item, index) },
            item[field.text]
          );
        });
      } else {
        return children;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log(123)
      var _props2 = this.props,
          children = _props2.children,
          isLoadMore = _props2.isLoadMore,
          onSelect = _props2.onSelect,
          showSearch = _props2.showSearch,
          className = _props2.className;

      var cls = (className || "") + ' x-list';
      var data = this.state.data;

      return _react2.default.createElement(
        'div',
        { className: cls },
        this.searchRender(),
        _react2.default.createElement(
          'div',
          { className: 'x-list-options' },
          this.renderChildren()
        ),
        isLoadMore ? _react2.default.createElement(
          'div',
          null,
          'load'
        ) : undefined
      );
    }
  }]);

  return List;
}(_react.Component);

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
  onSelect: function onSelect() {}
};
List.Option = _Option2.default;
exports.default = List;