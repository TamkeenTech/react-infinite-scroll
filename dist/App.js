"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _InfiniteScroll = _interopRequireDefault(require("./InfiniteScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// API ==> https://www.pexels.com/api/documentation/
var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false,
      count: 0,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    });

    _defineProperty(_assertThisInitialized(_this), "onLimitReached", function () {
      _this.setState({
        isLoading: true
      }, function () {
        setTimeout(function () {
          _this.setState(function (prevState) {
            return {
              isLoading: false,
              count: prevState.count + 1,
              data: prevState.data.concat([prevState.data.length + 1, prevState.data.length + 2])
            };
          });
        }, 2000);
      });
    });

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          data = _this$state.data,
          count = _this$state.count;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InfiniteScroll.default, {
        height: 500 // inverse
        // debug
        ,
        scrollThreshold: .1 // In case of Basic usage ( uncomment the following 3 lines and comment async object)
        // isLoading={isLoading}
        // isDataFinished={count === 6}
        // onLimitReached={this.onLimitReached}
        // In case of Async usage
        ,
        async: {
          configs: {
            url: 'https://api.pexels.com/v1/curated',
            headers: {
              Authorization: ' 563492ad6f91700001000001ea402605e7e54c028f6669cc2db8fbaf'
            }
          },
          dataTargetKey: 'photos',
          totalCountProp: 'total_results',
          pageSizeProp: 'per_page',
          pageSize: 80,
          page: 98
        },
        render: function render(response) {
          return response.data.map(function (item, i) {
            return /*#__PURE__*/_react.default.createElement("div", {
              key: i,
              style: {
                height: 50,
                border: '1px solid red',
                marginBottom: 10,
                minHeight: 50
              }
            }, item.photographer);
          });
        }
      }));
    }
  }]);

  return App;
}(_react.default.Component);

App.propTypes = {};
App.defaultProps = {};
var _default = App;
exports.default = _default;