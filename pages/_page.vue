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
      params: { page },
    },
  }) {
    const pages = await app.$wp.getPages()
    const post = pages.find(
      ({ slug }) => slug === encodeURI(page).toLocaleLowerCase()
    )
    return {
      post,
    }
  },
}
</script>
