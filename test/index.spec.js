'use strict';

console.log('inside index.spec.js');

import craigslist from '../lib/index';

describe('craigslist.js', function() {

  let region;
  let category;
  let query;

  beforeEach(function() {
    region = null;
    category = null;
    query = null;
  });

  describe('#getRegions', function() {
    it('should return a properly formatted list of all regions', function(done) {
      craigslist.getRegions().then((regions) => {
        assert.typeOf(regions, 'array');
        assert.typeOf(regions[0].name, 'string');
        assert.typeOf(regions[0].identifier, 'string');
        done();
      });
    });
  });

  describe('#getCategories', function() {
    beforeEach(function() {
      region = 'sfbay';
    });

    it('should return a properly formatted list of all categories by region', function(done) {
      craigslist.getCategories(region).then((categories) => {
        done();
      });
    });
  });

  describe('#getListings', function() {
    beforeEach(function() {
      region = '';
      category = '';
    });

    context('without a query', function() {
      beforeEach(function() {
        query = null;
      });

      it('should return a properly formatted list of listings', function() {
        craigslist.getListings(region, category, query).then((listings) => {
          done();
        });
      });
    });

    context('with a query', function() {
      beforeEach(function() {
        query = '';
      });

      it('should return a properly formatted list of listings', function() {
        craigslist.getListings(region, category, query).then((listings) => {
          done();
        });
      });
    });
  });

});
