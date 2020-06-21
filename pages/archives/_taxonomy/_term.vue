<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <nuxt-link :to="{ path: `/post/${post.id}` }">
        {{ post.title.rendered }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
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
      posts,
    }
  },
}
</script>

<style></style>
