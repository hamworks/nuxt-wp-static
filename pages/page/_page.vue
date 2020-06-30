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
  async asyncData({
    app,
    route: {
      params: { page },
    },
  }) {
    const posts = await app.$wp.getPosts({
      page,
    })
    return {
      posts,
    }
  },
}
</script>

<style></style>
