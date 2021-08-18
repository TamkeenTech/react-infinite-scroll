# @TamkeenTech/react-infinite-scroll

> Lightweight scroll controller library for React.js

[![NPM](https://img.shields.io/badge/npm-1.0.0-blue)](https://www.npmjs.com/package/@tamkeentech/react-i18n) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Tamkeentech, Logo](https://i.imgur.com/vwhssu8.png)

## Features
- [x] _**Basic usage**_ :  for **wrapping items and return callback function to update the items** kindly note all update props and state **managed by the user**
- [x] _**Invert functionality**_ : which allows you to scroll from bottom to top and vice versa
- [x] _**Async**_ : use this in case you have an endpoint that relies on pagination, **it will handle everything for you** 
## Installation

```bash
npm install --save @tamkeentech/react-infinite-scroll
```

## Getting Started

### Basic usage : [Demo](https://codesandbox.io/s/infinite-scroll-basic-usage-mxutg)

_All you need to do is to import the component and provide the minimum props as following_

```javascript
import React from 'react';

import InfiniteScroll from '@tamkeentech/react-infinite-scroll';

class App extends React.Component {

  state = {
    isLoading: false,
    count: 0,
    data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  }

  onLimitReached = () => {
    // your logic goes here
    // update isLoading, count and data
  }

  render() {
    const { isLoading, data, count } = this.state;

    return (
      <InfiniteScroll 
        // The minimum required props
        isLoading={isLoading}
        isDataFinished={count === 5}
        onLimitReached={this.onLimitReached}
        scrollThreshold={.1} // not required see props section
        render={() => data.map((item, i) => (
          <div key={i} style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>
            {item}
          </div>
        ))}
      />
    );
  }
}

export default App;
```

### Async usage : [Demo](https://codesandbox.io/s/async-infinite-scroll-ndxwu)

_All you need to do is to provide the **async object**  with the configuration that suits you but you have to know that **if you didn't provide the request url the component will handle it as the previous [ Basic usage ]**_

_Also in this case you will receive an object as a parameter for the **render prop**_ that holds the pagination status which consists of _**isLoading, data, error**_

```javascript
import React from 'react';

import InfiniteScroll from '@tamkeentech/react-infinite-scroll';

class App extends React.Component {
  render() {
    return (
      <InfiniteScroll 
        // The minimum required props
        async={{
          // axios configs
          configs: {
            url: 'your endpoint',
          },
          // optional props
          dataTargetKey: '...',
          totalCountProp: '...',
          pageSizeProp: '...',
          pageSize: 80,
          page: 1,
        }}
        scrollThreshold={.1} // not required see props section
        render={(response) => response.data.map((item, i) => (
          <div key={i} style={{ height: 50, border: '1px solid red', marginBottom: 10 }}>
            {item.name}
          </div>
        ))}
      />
    );
  }
}

export default App;
```

### Props 

_**Shared Props**_

**name**         | **type**           | **defaultValue** | **description**
-----------------|--------------------|------------------|--------------------
height           | string, number     | 100vh            | height of the scrollable container
className        | any                | ''               | wrapper className
scrollThreshold  | number 0 to 1      | 0.2              | calculate the distance in which you will fetch the data see **Notes** section to know it's calculated
inverse          | boolean            | false            | To make scroll from bottom to top and viceversa
enableLoader     | boolean            | true             | To show the loader or hide it
loader           | React.Component    | 'isLoading....'  | Loader indicator
debug            | boolean            | false            | used to log the **state, props, api call(success, error, distance at which the onScroll callback will work again, and more)**
render           | function           | () {}            | function that returns the children


_**Basic usage Props**_
**name**         | **type**    | **defaultValue** | **Required** | **description**
-----------------|-------------|------------------|--------------|-----------------
isLoading        | boolean     | false            | true         | To show the loader when the limit reached while there is feaching in progress, **to avoid infinite loop of fetching data as well**
isDataFinished   | boolean     | false            | true         | To control wheather there is a data to fetch or not, if **true** -----> onLimitReached() will not be called
onLimitReached   | function    | () {}            | true         | will be fired when **isDataFinished = false** and scrollOffsetBottom < calculated scrollLimit based on scrollThreshold


_**Async usage Props**_
**name**  | **type**    | **defaultValue** | **description**
----------|-------------|------------------|--------------------
async     | object      | {}               | It used for advanced usage when ur data and pagination relies on the server **see the below props to know what you have to provide**


_async object props_
**name**        | **type**    | **defaultValue** | **Required** | **description**
----------------|-------------|------------------|--------------|-----------------
configs         | object      | axios configs    | true         | axios request configs like (method, headers, bearer, ...etc), you have to provide **url** prop in it **otherwise the component will fallback to Basic usage state**
dataTargetKey   | string      | 'items'          | false        | Key to target the data from response in order to iterate over
totalCountProp  | string      | 'totalCount'     | false        | total items from server in order to calculate isDataFinished automatically
pageProp        | string      | 'page'           | false        | page prop to send it as a query like, endpoint?page=3
pageSizeProp    | string      | 'pageSize'       | false        | page size prop to send it as a query like, endpoint?page=3&pageSize=20
page            | number      | 0                | false        | initial request page, sometimes it starts from 0 or 1, it depends on your endpoint configuration
pageSize        | number      | 20               | false        | number of rows you need per request or per page

### Notes 
- In case of **Async** the **render(response)** will receive an object as a parameter that holds _**isLoading, data, error**_
- Distance of scroll from the end calculated based on **scrollThreshold** as the following 
```javascript
  const scrollThreshold = 0.2;
  const wrapperScrollHeight = 1000; // the height of the content in the wrapper including the hidden elements

  return scrollThreshold * wrapperScrollHeight; // 200px from the end of scrolling 
```

## License
MIT © 

## Author
[MohammedSaber](https://github.com/MohammedSaberMohammed)
