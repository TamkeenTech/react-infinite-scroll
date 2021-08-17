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
  // height of the scrollable container by default will be 100vh
  // you can change it to any value to control it
  height: '100vh',
  // wrapper className
  className: '',
  // It's used to calculate the distance in which you will fetch the data again using onLimitReached()
  // and triger loading state to show loader
  scrollThreshold: 0.2,
  // To make scroll from bottom to top
  inverse: false,
  // To show the loader when the limit reached while there is feaching in progress
  isLoading: false,
  // To show the loader or hide it
  enableLoader: true,
  // To control wheather there is a data to fetch or not 
  // if true -----> onLimitReached() will not be called
  isDataFinished: false,
  // Loader indicator
  loader: <h3 style={{color: 'red'}}>isLoading...</h3>,
  // used to log the state and props
  debug: false,
  // It used for advanced usage when ur data and pagination relies on the server 
  // and you don't want to handle the updation everytime
  async: {
    // axios request configs like (method, headers, bearer, ...etc)
    configs: {
      method: 'GET',
      // The endpoint you want to target
      url: '',
    },
    // Key to target the data from response in order to iterate over
    dataTargetKey: 'items',
    // total items from server in order to calculate isDataFinished automatically 
    totalCountProp: 'totalCount',
    // initial request page, sometimes it starts from 0 or 1 
    // it depends on your endpoint configuration
    page: 0,
    // number of rows you need per request or per page
    pageSize: 40,
    // page prop to send it as a query like, endpoint?page=3
    pageProp: 'page',
    // page size prop to send it as a query like, endpoint?page=3&pageSize=20
    pageSizeProp: 'pageSize',
  },
  // Alternative for children prop
  render() {},
  // will be fired when 
  // isDataFinished = false and scrollOffsetBottom < calculated scrollLimit based on scrollThreshold
  onLimitReached() {},
};

export default InfiniteScroll;