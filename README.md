# infinite-loop-loader
[![Build Status](https://travis-ci.org/nickbalestra/infinite-loop-loader.svg?branch=master)](https://travis-ci.org/nickbalestra/infinite-loop-loader)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A webpack 2 loader to transform ∞ loops so that they throw

Before:

```Javascript
while(true){
  // your logic here
}
```

After:

```Javascript
var __ITER = 1000000000; 
while(true) {
  if (__ITER <= 0) { 
    throw new Error("Loop exceeded maximum allowed iterations");
  }
  // your logic here
  __ITER--;
}
```

## Installation

```bash
npm install --save-dev infinite-loop-loader
```

## Usage

Add it to your webpack config

TODO
