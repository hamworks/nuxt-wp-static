import {
  getPosts,
  getTaxonomies,
  getTerms,
  getPages,
  setRootURL,
} from './services/wp'

const rootURL = 'https://ja.wordpress.org/wp-json/'

const postsPerPage = 10

const createPaginationRoutes = (posts, base = '') => {
  const page = Math.floor(posts.length / postsPerPage)
  return [...Array(page)].map((_, i) => encodeURI(`${base}/page/${i + 1}`))
}

const getIndexRoutes = async () => {
  const posts = await getPosts({ per_page: -1 })
  return createPaginationRoutes(posts)
}

const getPostRoutes = async () => {
  const posts = await getPosts({ per_page: -1 })
  return posts.flatMap(({ id }) => {
    return [encodeURI(`/archives/${id}`)]
  })
}

const getTermRoutes = async () => {
  const taxonomies = Object.values(await getTaxonomies())
  let termRoutes = []
  for (const taxonomy of taxonomies) {
    const { rest_base: restBase } = taxonomy
    const terms = await getTerms(restBase)
    termRoutes = [
      ...termRoutes,
      ...terms.map((term) =>
        encodeURI(`/archives/${taxonomy.slug}/${term.slug}`)
      ),
    ]
  }
  return termRoutes
}

const getPageRoutes = async () => {
  const pages = await getPages()
  return pages.map(({ slug }) => encodeURI(slug))
}

const getRoutes = async () => {
  setRootURL(rootURL)

  return [
    ...(await getIndexRoutes()),
    ...(await getPostRoutes()),
    ...(await getTermRoutes()),
    ...(await getPageRoutes()),
  ]
}

export default {
  target: 'static',
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: ['~/plugins/api-inject.js'],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/pwa'],
  build: {},
  wp: {
    apiRootURL: rootURL,
  },
  generate: {
    routes: getRoutes,
  },
}
