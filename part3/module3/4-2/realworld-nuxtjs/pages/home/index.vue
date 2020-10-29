<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :to="{ query: { tab: 'your_feed' } }"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ query: { tab: 'global_feed' } }"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :to="{ query: { tab: 'tag', tag: tag } }"
                  :class="{ active: tab === 'tag' }"
                  exact
                  >{{ "#" + tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
            <div class="article-meta">
              <nuxt-link :to="`profile/${article.author.username}`">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="`profile/${article.author.username}`"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | dateFormate("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="`article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
        <nav>
          <ul class="pagination">
            <li
              v-for="p in totalPage"
              :key="p"
              class="page-item"
              :class="{ active: page === p }"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: p,
                    tag: $route.query.tag,
                    tab: tab,
                  },
                }"
              >
                {{ p }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "HomePage",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab || "global_feed";
    const tag = query.tag;
    const loadArticles =
      tab === "global_feed" ? getArticles : getYourFeedArticles;
    const [artRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = artRes.data;
    articles.forEach(article => article.favoriteDisabled=false)
    const { tags } = tagRes.data;
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tab,
      tag,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      const { favorited, slug } = article;
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
       article.favoriteDisabled = false;
    },
  },
};
</script>

<style></style>
