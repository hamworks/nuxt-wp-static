<template>
  <div>
    <Posts :posts="posts" />

    <aside>
      <h2>Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <nuxt-link :to="{ path: `/archives/category/${category.slug}` }">
            {{ category.name }}
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Posts from '~/components/Posts'
export default {
  components: { Posts },
  async asyncData({ app }) {
    const posts = await app.$wp.getPosts()
    const categories = await app.$wp.getTaxonomy('categories')
    return {
      posts,
      categories,
    }
  },
}
</script>

<style></style>
