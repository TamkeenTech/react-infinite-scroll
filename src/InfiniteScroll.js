import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios'

const scrollableWrapperKey = 'infinite-scroll-wrapper';
class InfiniteScroll extends React.Component {

  state = {
    data: [],
    totalPagesCount: 0,
    page: this.asyncConfigs.page,
    isRequestLoading: false,
    error: null
  };

  componentDidMount() {
    this.scrollableWrapper.addEventListener('scroll', this.onScroll);

    // Async handler
    if(this.isAsync) {
      this.fetchData();
    }
  }

  fetchData() {
    const { page } = this.state;
    const { pageSize } = this.asyncConfigs;
    const { debug } = this.props;
    const { 
      configs, 
      dataTargetKey, 
      pageProp,
      pageSizeProp,
      totalCountProp
    } = this.asyncConfigs;

    this.setState({ isRequestLoading: true }, () => {
      axios({
        ...configs,
        params: { 
          ...configs.params,
          [pageProp]: page,
          [pageSizeProp]: pageSize,
        }
      })
        .then(res => {
          if(debug) {
            console.warn('[Success Response]')
            console.warn('You are targetting [', dataTargetKey, '] from', res.data,',if you want to target another prop use [ dataTargetKey ]')
          }

          const data = res.data[dataTargetKey];
          const totalPagesCount = res.data[totalCountProp];

          this.setState(prevState => ({ 
            data: prevState.data.concat(data),
            totalPagesCount
          }))
        })
        .catch(({ response }) => {
          if(debug) {
            console.error('[Err Response]')
            console.error('Error is', response)
          }

          this.setState({ error: response })
        })
        .finally(() => this.setState({ isRequestLoading: false }))
    });
  }

  componentWillUnmount() {
    this.scrollableWrapper.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const { isLoading, isAllResultsRendered } = this;
    const { error } = this.state;
    const { onLimitReached } = this.props;
    const { scrollHeight, scrollTop, clientHeight } = this.scrollableWrapper;
    const scrollOffset = scrollHeight - (Math.abs(scrollTop) + clientHeight);

    if(
      (scrollOffset < this.scrollLimit) 
      && 
      !isLoading
      &&
      !isAllResultsRendered
      && 
      // to prevent circular fetch in case of error
      !error 
    ) {

      if(!this.isAsync) {
        return onLimitReached();
      }

      this.setState(prevState => ({
        page: prevState.page + 1,
      }), () => this.fetchData())
    }
  }

  get scrollableWrapper() {
    return document.getElementById(scrollableWrapperKey);
  }

  get scrollLimit() {
    const { scrollThreshold } = this.props;
    const { scrollHeight } = this.scrollableWrapper;

    const ratio = scrollThreshold > 1 ? 1 : scrollThreshold

    return ratio * scrollHeight;
  }

  get isLoading() {
    const { isAsync } = this;
    const { isLoading } = this.props;
    const { isRequestLoading } = this.state;

    return isAsync ? isRequestLoading : isLoading;
  }

  get isAllResultsRendered() {
    const { isAsync, isInLastPage } = this;
    const { isDataFinished } = this.props;

    return isAsync ? isInLastPage : isDataFinished;
  }

  get isInLastPage() {
    const { pageSize } = this.asyncConfigs;
    const { page, totalPagesCount } = this.state;

    const pagesCount = Math.ceil(totalPagesCount / pageSize);

    return page === pagesCount;
  }

  get renderState() {
    const { data, error } = this.state;
    const { isAsync, isLoading } = this;
    let params = {};

    if(isAsync) {
      params = {
        isLoading,
        data,
        error
      };
    }

    return isAsync ? params : null;
  }

  get asyncConfigs() {
    const { async } = this.props;

    const enhancedConfigs = {
      pageProp: 'page',
      dataTargetKey: 'items',
      pageSizeProp: 'pageSize',
      totalCountProp: 'totalCount',

      page: 0,
      pageSize: 40,
      
    };

    return { 
      ...enhancedConfigs, 
      ...async,
      configs: {
        method: 'GET',
        url: '', 
        ...async.configs
      },
    };
  }

  get isAsync() {
    const { configs } = this.asyncConfigs;

    return !!configs.url;
  }

  render() {
    const { isLoading } = this;
    const { inverse, height, render, loader, debug, enableLoader, className } = this.props;

    const wrapperStyle = {
      height,
      overflow: "auto",
    };

    if(inverse) {
      wrapperStyle.display = 'flex';
      wrapperStyle.flexDirection = 'column-reverse';
    }

    if(debug) {
      console.warn('[props]', this.props);
      console.warn('[state]', this.state);
      console.warn('[distance from the [end of the total content] at which the [onLimitReached] will be triggered based on [scrollThreshold] ] ', this.scrollableWrapper && this.scrollLimit);
    }

    return(
      <div 
        style={wrapperStyle} 
        id={scrollableWrapperKey} 
        className={className}
      >
        {render(this.renderState)}
        {enableLoader && isLoading && loader}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),

  async: PropTypes.shape({
    configs: PropTypes.object,

    pageProp: PropTypes.string,
    pageSizeProp: PropTypes.string,
    dataTargetKey: PropTypes.string,
    totalCountProp: PropTypes.string,

    page: PropTypes.number,
    pageSize: PropTypes.number, 
  }),

  scrollThreshold: PropTypes.number,

  loader: PropTypes.any,
  className: PropTypes.any,

  isLoading: PropTypes.bool,
  enableLoader: PropTypes.bool,
  isDataFinished: PropTypes.bool,
  
  render: PropTypes.func,
  onLimitReached: PropTypes.func,
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

  loader: <h3 style={{color: 'red'}}>isLoading...</h3>,

  async: {
    configs: {
      method: 'GET',
      url: '',
    },

    pageProp: 'page',
    dataTargetKey: 'items',
    pageSizeProp: 'pageSize',
    totalCountProp: 'totalCount',

    pageSize: 20,
    page: 0,
  },

  render() {},
  onLimitReached() {},
};

export default InfiniteScroll;