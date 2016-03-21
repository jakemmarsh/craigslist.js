'use strict';

import request  from 'request';
import cheerio  from 'cheerio';
import {assert} from 'chai';
import buildUrl from './utils/build_url';

const craiglist = {

  getRegions() {
    return new Promise((resolve, reject) => {
      const url = buildUrl();

      request(url, (err, res, html) => {
        if ( err ) {
          reject(err);
        } else {
          const $ = cheerio(html);

          console.log($);
        }
      });
    });
  },

  getCategories(regionIdentifier) {
    assert.typeOf(regionIdentifier, 'string', 'regionIdentifier must be a string.');

    return new Promise((resolve, reject) => {
      const url = buildUrl(regionIdentifier);

      request(url, (err, res, html) => {
        if ( err ) {
          reject(err);
        } else {
          const $ = cheerio(html);
        }
      });
    });
  },

  getListings(regionIdentifier, categoryIdentifier, query = null) {
    assert.typeOf(regionIdentifier, 'string', 'regionIdentifier must be a string.');
    assert.typeOf(categoryIdentifier, 'string', 'categoryIdentifier must be a string.');

    if ( query ) {
      assert.typeOf(query, 'string', 'query must be a string.');
    }

    return new Promise((resolve, reject) => {
      const url = buildUrl(regionIdentifier, categoryIdentifier, query);

      request(url, (err, res, html) => {
        if ( err ) {
          reject(err);
        } else {
          const $ = cheerio(html);
        }
      });
    });
  }

};

export default craiglist;
