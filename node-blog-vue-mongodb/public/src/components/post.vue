<template>
  <div class="post">
    <h2><a>{{post.name}}</a>说</h2>
    <p>{{post.time}}</p>
    <p>{{post.post}}</p>
  </div>
</template>
<script>
export default {
  name: 'post',
  props: {
    post:{
      type: Object,
      required: true
    },
  }
}
</script>
<style>
.post{display:inline-block;float:left;padding:5px 10px;box-sizing:border-box;}
</style>
