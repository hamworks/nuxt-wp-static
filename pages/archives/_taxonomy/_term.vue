<template>
  <div>
    <h1>{{ taxonomy.name }}: {{ term.name }}</h1>
    <Posts :posts="posts" />
  </div>
</template>

<script>
import Posts from '~/components/Posts'
export default {
  components: { Posts },
  async asyncData({
    app,
    route: {
      params: { taxonomy, term },
    },
  }) {
    try {
      const taxonomies = Object.values(await app.$wp.getTaxonomies())
      const currentTaxonomy = taxonomies.find(({ slug }) => slug === taxonomy)
      const { rest_base: restBase } = currentTaxonomy
      const terms = await app.$wp.getTaxonomy(restBase)
      const currentTerm = terms.find(({ slug }) => slug === term)
      const posts = await app.$wp.getPosts({
        [restBase]: currentTerm.id,
      })
      return {
        taxonomy: currentTaxonomy,
        term: currentTerm,
        posts,
      }
    } catch (e) {
      return {
        taxonomy: {},
        term: {},
        posts: [],
      }
    }
  },
}
</script>
