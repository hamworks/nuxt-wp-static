<template>
  <div>
    <Posts :posts="posts" />
    <Categories />
  </div>
</template>

<script>
import Posts from '~/components/Posts'
import Categories from '~/components/Categories'
export default {
  components: { Posts, Categories },
  async asyncData({ app }) {
    const posts = await app.$wp.getPosts()
    return {
      posts,
    }
  },
}
</script>

<style></style>
