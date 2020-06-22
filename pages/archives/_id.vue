<template>
  <article>
    <h1>{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered" />
  </article>
</template>

<script>
export default {
  async asyncData({
    app,
    route: {
      params: { id },
    },
  }) {
    const post = await app.$wp.getPost(id)
    return {
      post,
    }
  },
}
</script>
