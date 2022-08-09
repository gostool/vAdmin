<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>TestPage</h3>
  <button @click="increment">store</button>
  <button @click="addTodo">addTodo</button>
  <h2>{{doneTodosCount}}</h2>
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
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', {amount: 20})
      console.log(this.$store.state.count)
    },
    addTodo() {
      this.$store.commit('addTodo')
      console.log(this.$store.state.count)
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
