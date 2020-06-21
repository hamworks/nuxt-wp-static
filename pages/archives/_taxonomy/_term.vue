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
    const taxonomies = Object.values(await app.$wp.getTaxonomies())
    const currentTaxonomy = taxonomies.find(({ slug }) => slug === taxonomy)
    if (!currentTaxonomy) {
      return {
        posts: [],
      }
    }
    const { rest_base: restBase } = currentTaxonomy
    const terms = await app.$wp.getTaxonomy(restBase)
    const currentTerm = terms.find(({ slug }) => slug === term)
    if (!currentTerm) {
      return {
        posts: [],
      }
    }
    const posts = await app.$wp.getPosts({
      [restBase]: currentTerm.id,
    })
    return {
      taxonomy: currentTaxonomy,
      term: currentTerm,
      posts,
    }
  },
}
</script>

<style></style>
