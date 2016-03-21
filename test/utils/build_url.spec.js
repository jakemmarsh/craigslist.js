'use strict';

import {assert} from 'chai';
import buildUrl from '../../lib/utils/build_url';

describe('#buildUrl', function() {

  let region;
  let category;
  let query;

  function getUrl() {
    return buildUrl(region, category, query);
  }

  beforeEach(function() {
    region = null;
    category = null;
  });

  context('with a region', function() {
    beforeEach(function() {
      region = 'sfbay';
    });

    context('without a category', function() {
      beforeEach(function() {
        category = null;
      });

      it('returns the correct URL for a specific region', function() {
        assert.strictEqual(getUrl(), 'https://sfbay.craigslist.org');
      });
    });

    context('with a category', function() {
      beforeEach(function() {
        category = 'bka';
      });

      context('without a query', function() {
        beforeEach(function() {
          query = null;
        });

        it('returns the correct URL for a specific region and category', function() {
          assert.strictEqual(getUrl(), 'https://sfbay.craigslist.org/search/bka');
        });
      });

      context('with a query', function() {
        beforeEach(function() {
          query = 'test';
        });

        it('returns the correct URL for a specific region, category, and query', function() {
          assert.strictEqual(getUrl(), 'https://sfbay.craigslist.org/search/bka?query=test');
        });
      });
    });
  });

  context('without a region', function() {
    beforeEach(function() {
      region = null;
    });

    it('returns the about page', function() {
      assert.strictEqual(getUrl(), 'https://craigslist.org/about/sites');
    });
  });

});
