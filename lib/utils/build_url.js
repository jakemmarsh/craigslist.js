'use strict';

const PROTOCOL = 'https';
const BASE_URL = 'craigslist.org';

const buildUrl = function(region = null, category = null, query = null) {

  let url = `${PROTOCOL}://`;

  if ( !region ) {
    url += `${BASE_URL}/about/sites`;
  } else {
    url += `${region}.`;

    url += BASE_URL;

    if ( category ) {
      url += `/search/${category}`;

      if ( query ) {
        url += `?query=${query}`;
      }
    }
  }

  return url;

};

export default buildUrl;
