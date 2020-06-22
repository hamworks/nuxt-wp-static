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
    error,
  }) {
    try {
      const taxonomies = Object.values(await app.$wp.getTaxonomies())
      const currentTaxonomy = taxonomies.find(({ slug }) => slug === taxonomy)
      const { rest_base: restBase } = currentTaxonomy
      const terms = await app.$wp.getTaxonomy(restBase)
      const currentTerm = terms.find(({ slug }) => {
        return slug === encodeURI(term).toLowerCase()
      })
      const posts = await app.$wp.getPosts({
        [restBase]: currentTerm.id,
      })
      return {
        taxonomy: currentTaxonomy,
        term: currentTerm,
        posts,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }
  },
}
</script>
