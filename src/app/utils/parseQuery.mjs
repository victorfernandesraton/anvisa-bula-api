import URL from 'url'

/**
 * 
 * @param {string} url 
 * @returns {URL.UrlWithParsedQuery}
 */
export const parseQueryFromURL = url => URL.parse(url, true)