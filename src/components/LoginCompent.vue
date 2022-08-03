<template>
    <h3>login</h3>
    {{msg}}
    <button @click="go"> abc</button>
    {{count}}
</template>

<script>
export default {
  name: 'LoginCompent',
  data() {
    return {
      "count": 0,
    }
  },
  methods: {
    go() {
      this.count++;
    },
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>

