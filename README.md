# @TamkeenTech/react-infinite-scroll

> Lightweight scroll controller library for React.js

[![NPM](https://img.shields.io/badge/npm-1.0.0-blue)](https://www.npmjs.com/package/@tamkeentech/react-i18n) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Tamkeentech, Logo](https://i.imgur.com/vwhssu8.png)

## Features
1. _**Basic usage**_ :  for **wrapping items and return callback function to update the items** kindly note all update props and state **managed by the user**
2. _**Invert functionality**_ : which allows you to scroll from bottom to top and vice versa
3. _**Async**_ : use this in case you have an endpoint that relies on pagination, **it will handle everything for you** 
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

