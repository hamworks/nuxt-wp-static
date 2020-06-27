<template>
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
</template>

<script>
export default {
  name: 'Categories',
  async fetch() {
    this.categories = await this.$wp.getTerms('categories')
  },
  data() {
    return {
      categories: [],
    }
  },
}
</script>

<style scoped></style>
