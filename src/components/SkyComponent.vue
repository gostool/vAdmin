<template>
  <div>fafaf</div>
  <!-- <slot name="header" :h=a></slot> -->
  <slot name="header"></slot>
  <slot name="body"></slot>
  <slot></slot>
</template>

<script>
export default {
  setup(props, context) {
    var a = 10;
    console.log(props);
    console.log(context.slots.header());
    console.log(context.slots.header()[1].children);
    console.log(context.slots.body()[0].children);
    context.slots.body()[0].children = "body changed";
    console.log(context.slots.body()[0].children);
    setTimeout(() => {
      console.log(context.slots.body()[0].children);
    }, 2000);
    return {
      a,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
