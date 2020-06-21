import { getPosts, getTaxonomies, getTaxonomy, setRootURL } from './services/wp'

const rootURL = 'https://ja.wordpress.org/wp-json/'

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
    routes: async () => {
      setRootURL(rootURL)
      const posts = await getPosts()
      const postRoutes = posts.map(({ id }) => `archives/${id}`)
      const taxonomies = Object.values(await getTaxonomies())
      let termRoutes = []
      for (const taxonomy of taxonomies) {
        const { rest_base: restBase } = taxonomy
        const terms = await getTaxonomy(restBase)
        termRoutes = [
          ...termRoutes,
          ...terms.map((term) => `archives/${taxonomy.slug}/${term.slug}`),
        ]
      }
      return [...postRoutes, ...termRoutes]
    },
  },
}
