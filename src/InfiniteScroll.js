import React from 'react';
import PropTypes from 'prop-types';

class InfiniteScroll extends React.Component {

  componentDidMount() {
    // document.querySelector('#infinite-scroll-wrapper').addEventListener('scroll', this.onScroll);
    this.scrollableWrapper.addEventListener('scroll', this.onScroll)
  }

  onScroll = e => {
    console.log('scrollableWrapper', this.scrollableWrapper)
    const { scrollHeight, scrollTop, clientHeight } = this.scrollableWrapper;
    console.log('scrollHeight, scrollTop, clientHeight', scrollHeight, scrollTop, clientHeight)
    const offsetBottom = scrollHeight - (scrollTop + clientHeight);
    console.log('offsetBottom', offsetBottom)
  }

  get scrollableWrapper() {
    return document.getElementById('infinite-scroll-wrapper');
  }

  render() {
    const { height } = this.props;

    const wrapperStyle = {
      height,
      overflow: "scroll",
    };

    return(
      <div style={wrapperStyle} id='infinite-scroll-wrapper'>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        {/* <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
        <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div> */}
      </div>
    );
  }
}

InfiniteScroll.propTypes = {
  height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};

InfiniteScroll.defaultProps = {
  height: 400
};

export default InfiniteScroll;