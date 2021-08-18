"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var scrollableWrapperKey = 'infinite-scroll-wrapper';

var InfiniteScroll = /*#__PURE__*/function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  var _super = _createSuper(InfiniteScroll);

  function InfiniteScroll() {
    var _this;

    _classCallCheck(this, InfiniteScroll);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      data: [],
      totalPagesCount: 0,
      page: _this.asyncConfigs.page,
      isRequestLoading: false,
      error: null
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          isLoading = _assertThisInitialize.isLoading,
          isAllResultsRendered = _assertThisInitialize.isAllResultsRendered;

      var error = _this.state.error;
      var onLimitReached = _this.props.onLimitReached;
      var _this$scrollableWrapp = _this.scrollableWrapper,
          scrollHeight = _this$scrollableWrapp.scrollHeight,
          scrollTop = _this$scrollableWrapp.scrollTop,
          clientHeight = _this$scrollableWrapp.clientHeight;
      var scrollOffset = scrollHeight - (Math.abs(scrollTop) + clientHeight);

      if (scrollOffset < _this.scrollLimit && !isLoading && !isAllResultsRendered && // to prevent circular fetch in case of error
      !error) {
        if (!_this.isAsync) {
          return onLimitReached();
        }

        _this.setState(function (prevState) {
          return {
            page: prevState.page + 1
          };
        }, function () {
          return _this.fetchData();
        });
      }
    });

    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollableWrapper.addEventListener('scroll', this.onScroll); // Async handler

      if (this.isAsync) {
        this.fetchData();
      }
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this2 = this;

      var page = this.state.page;
      var pageSize = this.asyncConfigs.pageSize;
      var debug = this.props.debug;
      var _this$asyncConfigs = this.asyncConfigs,
          configs = _this$asyncConfigs.configs,
          dataTargetKey = _this$asyncConfigs.dataTargetKey,
          pageProp = _this$asyncConfigs.pageProp,
          pageSizeProp = _this$asyncConfigs.pageSizeProp,
          totalCountProp = _this$asyncConfigs.totalCountProp;
      this.setState({
        isRequestLoading: true
      }, function () {
        var _objectSpread2;

        (0, _axios.default)(_objectSpread(_objectSpread({}, configs), {}, {
          params: _objectSpread(_objectSpread({}, configs.params), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, pageProp, page), _defineProperty(_objectSpread2, pageSizeProp, pageSize), _objectSpread2))
        })).then(function (res) {
          if (debug) {
            console.warn('[Success Response]');
            console.warn('You are targetting [', dataTargetKey, '] from', res.data, ',if you want to target another prop use [ dataTargetKey ]');
          }

          var data = res.data[dataTargetKey];
          var totalPagesCount = res.data[totalCountProp];

          _this2.setState(function (prevState) {
            return {
              data: prevState.data.concat(data),
              totalPagesCount: totalPagesCount
            };
          });
        }).catch(function (_ref) {
          var response = _ref.response;

          if (debug) {
            console.error('[Err Response]');
            console.error('Error is', response);
          }

          _this2.setState({
            error: response
          });
        }).finally(function () {
          return _this2.setState({
            isRequestLoading: false
          });
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.scrollableWrapper.removeEventListener('scroll', this.onScroll);
    }
  }, {
    key: "scrollableWrapper",
    get: function get() {
      return document.getElementById(scrollableWrapperKey);
    }
  }, {
    key: "scrollLimit",
    get: function get() {
      var scrollThreshold = this.props.scrollThreshold;
      var scrollHeight = this.scrollableWrapper.scrollHeight;
      var ratio = scrollThreshold > 1 ? 1 : scrollThreshold;
      return ratio * scrollHeight;
    }
  }, {
    key: "isLoading",
    get: function get() {
      var isAsync = this.isAsync;
      var isLoading = this.props.isLoading;
      var isRequestLoading = this.state.isRequestLoading;
      return isAsync ? isRequestLoading : isLoading;
    }
  }, {
    key: "isAllResultsRendered",
    get: function get() {
      var isAsync = this.isAsync,
          isInLastPage = this.isInLastPage;
      var isDataFinished = this.props.isDataFinished;
      return isAsync ? isInLastPage : isDataFinished;
    }
  }, {
    key: "isInLastPage",
    get: function get() {
      var pageSize = this.asyncConfigs.pageSize;
      var _this$state = this.state,
          page = _this$state.page,
          totalPagesCount = _this$state.totalPagesCount;
      var pagesCount = Math.ceil(totalPagesCount / pageSize);
      return page === pagesCount;
    }
  }, {
    key: "renderState",
    get: function get() {
      var _this$state2 = this.state,
          data = _this$state2.data,
          error = _this$state2.error;
      var isAsync = this.isAsync,
          isLoading = this.isLoading;
      var params = {};

      if (isAsync) {
        params = {
          isLoading: isLoading,
          data: data,
          error: error
        };
      }

      return isAsync ? params : null;
    }
  }, {
    key: "asyncConfigs",
    get: function get() {
      var async = this.props.async;
      var enhancedConfigs = {
        pageProp: 'page',
        dataTargetKey: 'items',
        pageSizeProp: 'pageSize',
        totalCountProp: 'totalCount',
        page: 0,
        pageSize: 40
      };
      return _objectSpread(_objectSpread(_objectSpread({}, enhancedConfigs), async), {}, {
        configs: _objectSpread({
          method: 'GET',
          url: ''
        }, async.configs)
      });
    }
  }, {
    key: "isAsync",
    get: function get() {
      var configs = this.asyncConfigs.configs;
      return !!configs.url;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.isLoading;
      var _this$props = this.props,
          inverse = _this$props.inverse,
          height = _this$props.height,
          render = _this$props.render,
          loader = _this$props.loader,
          debug = _this$props.debug,
          enableLoader = _this$props.enableLoader,
          className = _this$props.className;
      var wrapperStyle = {
        height: height,
        overflow: "auto"
      };

      if (inverse) {
        wrapperStyle.display = 'flex';
        wrapperStyle.flexDirection = 'column-reverse';
      }

      if (debug) {
        console.warn('[props]', this.props);
        console.warn('[state]', this.state);
        console.warn('[distance from the [end of the total content] at which the [onLimitReached] will be triggered based on [scrollThreshold] ] ', this.scrollableWrapper && this.scrollLimit);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperStyle,
        id: scrollableWrapperKey,
        className: className
      }, render(this.renderState), enableLoader && isLoading && loader);
    }
  }]);

  return InfiniteScroll;
}(_react.default.Component);

InfiniteScroll.propTypes = {
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  async: _propTypes.default.shape({
    configs: _propTypes.default.object,
    pageProp: _propTypes.default.string,
    pageSizeProp: _propTypes.default.string,
    dataTargetKey: _propTypes.default.string,
    totalCountProp: _propTypes.default.string,
    page: _propTypes.default.number,
    pageSize: _propTypes.default.number
  }),
  scrollThreshold: _propTypes.default.number,
  loader: _propTypes.default.any,
  className: _propTypes.default.any,
  isLoading: _propTypes.default.bool,
  enableLoader: _propTypes.default.bool,
  isDataFinished: _propTypes.default.bool,
  render: _propTypes.default.func,
  onLimitReached: _propTypes.default.func
};
InfiniteScroll.defaultProps = {
  height: '100vh',
  className: '',
  scrollThreshold: 0.2,
  debug: false,
  inverse: false,
  isLoading: false,
  enableLoader: true,
  isDataFinished: false,
  loader: /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      color: 'red'
    }
  }, "isLoading..."),
  async: {
    configs: {
      method: 'GET',
      url: ''
    },
    pageProp: 'page',
    dataTargetKey: 'items',
    pageSizeProp: 'pageSize',
    totalCountProp: 'totalCount',
    pageSize: 20,
    page: 0
  },
  render: function render() {},
  onLimitReached: function onLimitReached() {}
};
var _default = InfiniteScroll;
exports.default = _default;