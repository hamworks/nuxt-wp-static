import 'cross-fetch/polyfill'
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@hamworks/wordpress-api-fetch'
import mem from 'mem'

apiFetch.use(apiFetch.fetchAllInParallelMiddleware)
const memoizedFetch = mem(apiFetch, { cacheKey: JSON.stringify })

const formatPost = (post) => {
  const {
    _links,
    comment_status: cs,
    guid,
    ping_status: ps,
    status,
    ...allowed
  } = post
  return allowed
}

const parPage = 10

export const setRootURL = (url) => {
  apiFetch.use(apiFetch.createRootURLMiddleware(url))
}

export const getPosts = async (params) => {
  const posts = await memoizedFetch({
    path: addQueryArgs('/wp/v2/posts', { ...{ per_page: parPage }, ...params }),
  })
  return posts.map(formatPost)
}

export const getPost = async (id) => {
  const post = await memoizedFetch({ path: `/wp/v2/posts/${id}` })
  return formatPost(post)
}

export const getPages = async (params) => {
  const pages = await memoizedFetch({
    path: addQueryArgs('/wp/v2/pages', { ...{ per_page: -1 }, ...params }),
  })
  return pages.map(formatPost)
}

export const getPage = async (id) => {
  const page = await memoizedFetch({ path: `/wp/v2/pages/${id}` })
  return formatPost(page)
}

export const getTaxonomies = async () => {
  const taxonomies = await memoizedFetch({
    path: addQueryArgs('/wp/v2/taxonomies', {}),
  })
  return taxonomies
}

export const getTerms = async (taxonomy) => {
  const terms = await memoizedFetch({
    path: addQueryArgs(`/wp/v2/${taxonomy}`, {
      ...{ per_page: -1 },
    }),
  })
  return terms
}
