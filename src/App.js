import React from 'react';

import InfiniteScroll from './InfiniteScroll';

class App extends React.Component {

  state = {
    isLoading: false,
    count: 0,
    data: [
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
      <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
    ]
  }

  onLimitReached = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState(prevState => ({
          isLoading: false,
          count: prevState.count + 1,
          data: prevState.data.concat([
            <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>,
            <div style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>1</div>
          ]) 
        }))
      }, 2000)
    });
  }

  render() {
    const { isLoading, data, count } = this.state;
    console.log('count',count);
    return (
      <React.Fragment>
        <InfiniteScroll 
          height={500}
          isLoading={isLoading}
          isDataFinished={count === 2}
          onLimitReached={this.onLimitReached}
          scrollThreshold={.1}
          render={() => data.map(item => item)}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;