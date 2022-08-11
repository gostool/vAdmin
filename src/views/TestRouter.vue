<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>HomePage</h3>
  <button @click="goToDashboard()">goToDashboard</button>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
        isAuthenticated: true,
    }
  },
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      console.log(this.$route)
      this.isAuthenticated = false;
      if (this.isAuthenticated) {
        this.$router.push("/home");
      } else {
        this.$router.push("/login", this.loginInfo);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
