import React from 'react';

import InfiniteScroll from './InfiniteScroll';

class App extends React.Component {

  state = {
    isLoading: false,
    count: 0,
    data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  }

  onLimitReached = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState(prevState => ({
          isLoading: false,
          count: prevState.count + 1,
          data: prevState.data.concat([prevState.data.length + 1, prevState.data.length + 2])
        }))
      }, 2000)
    });
  }

  render() {
    const { isLoading, data, count } = this.state;

    return (
      <React.Fragment>
        <InfiniteScroll 
          height={500}
          async={{ 
            configs: {
              url: 'https://pixabay.com/api/'
            },
            query: 'key=21237839-acf386e90dbcfa64cab0c353e',
            dataTargetKey: 'hits',
            pageSizeProp: 'per_page',
            pageSize: 10,
            page: 1
           }}
          isLoading={isLoading}
          // isDataFinished={count === 2}
          onLimitReached={this.onLimitReached}
          scrollThreshold={.1}
          render={() => data.map(item => (
            <div key={item} style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>{item}</div>
          ))}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;