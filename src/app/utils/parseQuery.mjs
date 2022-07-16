import URL from 'url'

export const parseQueryFromURL = url => URL.parse(url, true)