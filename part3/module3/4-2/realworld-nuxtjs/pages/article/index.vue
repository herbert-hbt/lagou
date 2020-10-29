<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import Markdown from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComment from "./components/article-comment.vue";

export default {
  name: "ArticleIndex",
  components: {
    ArticleMeta,
    ArticleComment,
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    let { article } = data;
    const md = new Markdown();
    article = { ...article, body: md.render(article.body) };
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description", //唯一标识，防止不能覆盖父级meta
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style></style>
