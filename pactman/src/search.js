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
      'We are sorry, an error occurred, trying visiting the website instead https://docs.pactflow.io/',
    )
  }
}

const initSearch = (type) => {
  return function searchByQuery(query) {
    return doSearch(
      type === 'pactflow'
        ? {
            appId: 'LY8MHW6MWQ',
            apiKey: '6d5a0494675f3e1d9ea2b3483a38f44b',
            indexName: 'Pactflow',
          }
        : {
            appId: '6CMS0LVNYE',
            apiKey: '6a92d95a6d82b7d09cd6ccb1ef485f03',
            indexName: 'pact',
          },
      query,
    )
  }
}

module.exports = {
  initSearch,
}
