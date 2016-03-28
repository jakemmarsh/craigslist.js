'use strict';

import {assert}   from 'chai';
import craigslist from '../lib/index';

describe('craigslist.js', function() {

  let regionIdentifier;
  let categoryIdentifier;
  let query;

  beforeEach(function() {
    regionIdentifier = null;
    categoryIdentifier = null;
    query = null;
  });

  describe('#getRegions', function() {
    it('should return a properly formatted list of all regions', function(done) {
      craigslist.getRegions().then((regions) => {
        assert.typeOf(regions, 'array');
        assert.isAbove(regions.length, 0);

        regions.forEach((regionResult) => {
          assert.typeOf(regionResult.name, 'string');
          assert.typeOf(regionResult.identifier, 'string');
        });

        done();
      });
    });
  });

  describe('#getCategories', function() {
    beforeEach(function() {
      regionIdentifier = 'sfbay';
    });

    it('should return a properly formatted list of all categories by region', function(done) {
      craigslist.getCategories(regionIdentifier).then((categories) => {
        assert.typeOf(categories, 'array');
        assert.isAbove(categories.length, 0);

        categories.forEach((category) => {
          assert.typeOf(category.name, 'string');
          assert.typeOf(category.identifier, 'string');
        });

        done();
      });
    });
  });

  describe('#getListings', function() {
    beforeEach(function() {
      regionIdentifier = 'sfbay';
      categoryIdentifier = 'ela';
    });

    context('without a query', function() {
      beforeEach(function() {
        query = null;
      });

      it('should return a properly formatted list of listings', function(done) {
        craigslist.getListings(regionIdentifier, categoryIdentifier, query).then((listings) => {
          assert.typeOf(listings, 'array');
          assert.isAbove(listings.length, 0);

          listings.forEach((listing) => {
            assert.typeOf(listing.title, 'string');

            if ( listing.price ) {
              assert.typeOf(listing.price, 'string');
            }

            assert.typeOf(listing.location, 'string');
            assert.typeOf(listing.image, 'string');
            assert.typeOf(listing.url, 'string');
          });

          done();
        });
      });
    });

    context('with a query', function() {
      beforeEach(function() {
        query = 'macbook';
      });

      it('should return a properly formatted list of listings', function(done) {
        craigslist.getListings(regionIdentifier, categoryIdentifier, query).then((listings) => {
          assert.typeOf(listings, 'array');
          assert.isAbove(listings.length, 0);

          listings.forEach((listing) => {
            assert.typeOf(listing.title, 'string');

            if ( listing.price ) {
              assert.typeOf(listing.price, 'string');
            }

            assert.typeOf(listing.location, 'string');
            assert.typeOf(listing.image, 'string');
            assert.typeOf(listing.url, 'string');
          });

          done();
        });
      });
    });
  });

});
