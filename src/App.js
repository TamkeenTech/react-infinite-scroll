import React from 'react';

import InfiniteScroll from './InfiniteScroll';

// API ==> https://www.pexels.com/api/documentation/
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
          // inverse
          // debug
          scrollThreshold={.1}
          // In case of Basic usage ( uncomment the following 3 lines and comment async object)
          // isLoading={isLoading}

          // isDataFinished={count === 6}
          // onLimitReached={this.onLimitReached}
          // In case of Async usage
          async={{ 
            configs: {
              url: 'https://api.pexels.com/v1/curated',
              headers: {
                Authorization: ' 563492ad6f91700001000001ea402605e7e54c028f6669cc2db8fbaf'
              },
            },
            dataTargetKey: 'photos',
            totalCountProp: 'total_results',
            pageSizeProp: 'per_page',
            pageSize: 80,
            page: 98,
          }}

          render={(response) => response.data.map((item, i) => (
            <div 
              key={i}
              style={{ height: 50, border: '1px solid red', marginBottom: 10, minHeight: 50 }}
            >
                {item.photographer}
            </div>
          ))}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;