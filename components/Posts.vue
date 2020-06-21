<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <nuxt-link :to="{ path: `/archives/${post.id}` }">
        {{ post.title.rendered }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Posts',
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
