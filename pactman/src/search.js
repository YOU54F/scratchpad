// @ts-check

const algolia = require('algoliasearch')

const doSearch = async ({ appId, apiKey, indexName }, query) => {
  if (!appId) {
    throw new Error('Missing Algolia App id')
  }
  if (!apiKey) {
    throw new Error('Missing Algolia search key')
  }
  if (!indexName) {
    throw new Error('Missing Algolia index name')
  }

  const searchParams = {
    // use custom highlight tags we can easily find later on
    highlightPreTag: '>>>',
    highlightPostTag: '<<<',
    hitsPerPage: 12,
  }

  try {
    // @ts-ignore
    const client = algolia(appId, apiKey)
    const index = client.initIndex(indexName)
    const results = await index.search(query, searchParams)
    return results
  } catch (error) {
    console.log(
      'We are sorry, an error occurred, trying visiting the website instead https://docs.pact.io/',
    )
  }
}

const initSearch = () => {
  const appId = process.env.APPLICATION_ID
  const apiKey = process.env.API_KEY
  const indexName = process.env.INDEX_NAME

  const clientOptions = {
    appId,
    apiKey,
    indexName,
  }

  return function searchByQuery(query) {
    return doSearch(clientOptions, query)
  }
}

module.exports = {
  initSearch,
}
