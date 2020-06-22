import 'cross-fetch/polyfill'
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@hamworks/wordpress-api-fetch'

apiFetch.use(apiFetch.fetchAllInParallelMiddleware)

export const setRootURL = (url) => {
  apiFetch.use(apiFetch.createRootURLMiddleware(url))
}

export const getPosts = async (params) =>
  await apiFetch({
    path: addQueryArgs('/wp/v2/posts', { ...{ per_page: -1 }, ...params }),
  })

export const getPost = async (id) =>
  await apiFetch({ path: `/wp/v2/posts/${id}` })

export const getPages = async (params) =>
  await apiFetch({
    path: addQueryArgs('/wp/v2/pages', { ...{ per_page: -1 }, ...params }),
  })

export const getPage = async (id) =>
  await apiFetch({ path: `/wp/v2/pages/${id}` })

export const getTaxonomies = async () =>
  await apiFetch({
    path: addQueryArgs('/wp/v2/taxonomies', {}),
  })

export const getTaxonomy = async (taxonomy) =>
  await apiFetch({
    path: addQueryArgs(`/wp/v2/${taxonomy}`, {
      ...{ per_page: -1 },
    }),
  })
