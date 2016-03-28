'use strict';

import request  from 'request';
import cheerio  from 'cheerio';
import {assert} from 'chai';
import buildUrl from './utils/build_url';

const craiglist = {

  getRegions() {
    const regionRegex = new RegExp('\/\/(.*)\.craigslist\..*/', 'i');

    return new Promise((resolve, reject) => {
      const url = buildUrl();

      request(url, (err, res, html) => {
        if ( err ) {
          reject(err);
        } else {
          const $ = cheerio.load(html);
          const $regionLinks = $('.box ul li a');
          const regions = [];

          $regionLinks.each((index, element) => {
            const $element = $(element);
            const name = $element.text();
            const href = $element.attr('href');
            const regexResults = regionRegex.exec(href);
            const identifier = regexResults ? regexResults[1] : null;

            if ( name && identifier ) {
              regions.push({
                name,
                identifier
              });
            }
          });

          resolve(regions);
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
          const $ = cheerio.load(html);
          const $categoryLinks = $('.cats ul li a');
          const categories = [];

          $categoryLinks.each((index, element) => {
            const $element = $(element);
            const href = $element.attr('href');
            const name = $element.text();
            const identifier = $element.data('cat');
            const topLevelCategoryRegex = new RegExp('\/search\/', 'i');
            const isTopLevelCategory = topLevelCategoryRegex.test(href);

            if ( isTopLevelCategory && name && identifier ) {
              categories.push({
                name,
                identifier
              });
            }
          });

          resolve(categories);
        }
      });
    });
  },

  getListings(regionIdentifier, categoryIdentifier, query = null, limit = 100) {
    assert.typeOf(regionIdentifier, 'string', 'regionIdentifier must be a string.');
    assert.typeOf(categoryIdentifier, 'string', 'categoryIdentifier must be a string.');

    if ( typeof(query) === 'number' ) {
      limit = query;
      query = null;
    }

    assert.isAtMost(limit, 100, 'Limit must be 100 or lower.');

    if ( query ) {
      assert.typeOf(query, 'string', 'query must be a string.');
    }

    return new Promise((resolve, reject) => {
      const url = buildUrl(regionIdentifier, categoryIdentifier, query);

      request(url, (err, res, html) => {
        if ( err ) {
          reject(err);
        } else {
          const $ = cheerio.load(html);
          const $listings = $('p.row');
          const listings = [];

          $listings.each((index, element) => {
            const $element = $(element);
            const title = $element.find('#titletextonly').text();
            const price = $element.find('.price').first().text() || null;
            const location = $element.find('.pnr small').text().trim().replace(/[\(|\)]/gi, '');
            const image = ''; // TODO: finish this
            const url = ''; // TODO: finish this

            if ( title ) {
              listings.push({
                title,
                price,
                location,
                image,
                url
              });
            }
          });

          resolve(listings);
        }
      });
    });
  }

};

export default craiglist;
