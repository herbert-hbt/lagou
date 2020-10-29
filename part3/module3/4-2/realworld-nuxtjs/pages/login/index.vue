<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="field + index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                required
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                required
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                required
                minlength="8"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "LoginIndex",
  middleware: "notauthenticated",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        this.$store.commit("SetUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style></style>
