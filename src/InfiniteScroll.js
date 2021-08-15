import React from 'react';
import PropTypes from 'prop-types';

const scrollableWrapperKey = 'infinite-scroll-wrapper';
class InfiniteScroll extends React.Component {

  componentDidMount() {
    this.scrollableWrapper.addEventListener('scroll', this.onScroll);
    // Todo
    // async = {
    //   endpoint: '',
    //   totalCountProp: '',
    //   dataTargetKey: 'items',
    //   page: 0,
    //   pageSize: 10, 
    // }
  }

  componentWillUnmount() {
    this.scrollableWrapper.removeEventListener('scroll', this.onScroll)
  }

  onScroll = e => {
    const { isLoading } = this;
    const { onLimitReached, isDataFinished } = this.props;
    const { scrollHeight, scrollTop, clientHeight } = this.scrollableWrapper;
    const offsetBottom = scrollHeight - (scrollTop + clientHeight);

    if(
      (offsetBottom < this.scrollLimit) 
      && 
      !isLoading
      &&
      !isDataFinished
    ) {
      this.setState({ isLoading: true }, () => {
        onLimitReached();
      });
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
    const { isLoading } = this.props;

    return isLoading;
  }

  render() {
    const { isLoading } = this;
    const { height, render, loader } = this.props;

    const wrapperStyle = {
      height,
      overflow: "scroll",
    };

    return(
      <div style={wrapperStyle} id={scrollableWrapperKey}>
        {render()}
        {isLoading && loader}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),

  scrollThreshold: PropTypes.number,

  loader: PropTypes.any,

  isLoading: PropTypes.bool,
  isDataFinished: PropTypes.bool,
  
  render: PropTypes.func,
  onLimitReached: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  // height of the scrollable container by default will be 100vh
  // you can change it to any value to control it
  height: '100vh',
  // It's used to calculate the distance in which you will fetch the data again using onLimitReached()
  // and triger loading state to show loader
  // 
  scrollThreshold: 0.2,
  // To show the loader when the limit reached while there is feaching in progress
  isLoading: false,
  // To control wheather there is a data to fetch or not 
  // if true -----> onLimitReached() will not be called
  isDataFinished: false,
  // Loader indicator
  loader: <h3 style={{color: 'red'}}>isLoading...</h3>,
  // Alternative for children prop
  render() {},
  // will be fired when 
  // isDataFinished = false and scrollOffsetBottom < calculated scrollLimit based on scrollThreshold
  onLimitReached() {},
};

export default InfiniteScroll;