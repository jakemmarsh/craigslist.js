# craigslist.js [![npm version](https://badge.fury.io/js/playback-queue.svg)](https://badge.fury.io/js/playback-queue) [![Build Status](https://travis-ci.org/jakemmarsh/craigslist.js.svg?branch=master)](https://travis-ci.org/jakemmarsh/craigslist.js) [![Dependency Status](https://david-dm.org/jakemmarsh/craigslist.js.svg)](https://david-dm.org/jakemmarsh/craigslist.js) [![devDependency Status](https://david-dm.org/jakemmarsh/craigslist.js/dev-status.svg)](https://david-dm.org/jakemmarsh/craigslist.js#info=devDependencies)
A Javascript API wrapper for craigslist.org.

### Getting Started

1. `npm install --save craigslist.js`
2. `import craigslist from 'craigslist.js';`
3. Invoke API methods

### Methods

##### `getRegions()`

This method will return an array of regions, scraped from [http://www.craigslist.org/about/sites](http://www.craigslist.org/about/sites). The results will be of the format:

```json
  [
    ...
    {
      name: 'san francisco bay area',
      identifier: 'sfbay'
    }
  ]
```

The `identifier` property should be used when invoking other methods that require a region.

##### `getCategories(regionIdentifier)`

This method will return an array of regions, scraped from the provided region's index page. The results will be of the format:

```json
  [
    ...
    {
      name: 'books',
      identifier: 'bka'
    }
  ]
```

The `identifier` property should be used when invoking other methods that require a category.

##### `getListings(regionIdentifier, categoryIdentifier, query = null, limit = 50)`

This method will return an array of listing results within the specified region and category, also matching an optional query. It will return up to `limit` results, which defaults to 50. The results will be of the format:

```json
  [
    {
      title: '',
      price: 50.99,
      location: '',
      image: '',
      url: ''
    }
  ]
```

### Running Tests

1. `git clone https://github.com/jakemmarsh/craigslist.js.git`
2. `npm install`
3. `npm test`
