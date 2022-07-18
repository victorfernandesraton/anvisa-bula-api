import URL from 'url'

/**
 * 
 * @param {string} url 
 * @returns {URL.UrlWithParsedQuery}
 */
export const parseQueryFromURL = url => URL.parse(url, true)

export const parseQueryToURL = query => Object.keys(query).map(key => encodeURIComponent(key) + encodeURIComponent(query[key])).join('&')